import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const titleBarHeight = 44
const supportsTitleBarOverlay = process.platform === 'win32' || process.platform === 'linux'

type TitleBarOverlayColors = { color: string; symbolColor: string }

function parseHexColor(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '').trim()
  if (normalized.length !== 6) throw new Error(`Invalid hex color: ${hex}`)
  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  return { r, g, b }
}

function toHexColor({ r, g, b }: { r: number; g: number; b: number }): string {
  const clamp = (v: number): number => Math.max(0, Math.min(255, Math.round(v)))
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b)
    .toString(16)
    .padStart(2, '0')}`
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

const overlayState = new WeakMap<BrowserWindow, TitleBarOverlayColors>()
const overlayAnimationTimer = new WeakMap<BrowserWindow, NodeJS.Timeout>()

function setWindowTitleBarOverlay(win: BrowserWindow, colors: TitleBarOverlayColors): void {
  win.setTitleBarOverlay({ ...colors, height: titleBarHeight })
}

function animateWindowTitleBarOverlay(
  win: BrowserWindow,
  from: TitleBarOverlayColors,
  to: TitleBarOverlayColors,
  durationMs = 180
): void {
  const existing = overlayAnimationTimer.get(win)
  if (existing) clearInterval(existing)

  const fromRgb = parseHexColor(from.color)
  const toRgb = parseHexColor(to.color)
  const start = Date.now()

  const timer = setInterval(() => {
    const elapsed = Date.now() - start
    const t = Math.min(1, elapsed / durationMs)
    const color = toHexColor({
      r: lerp(fromRgb.r, toRgb.r, t),
      g: lerp(fromRgb.g, toRgb.g, t),
      b: lerp(fromRgb.b, toRgb.b, t)
    })

    try {
      setWindowTitleBarOverlay(win, { color, symbolColor: to.symbolColor })
    } catch (error) {
      clearInterval(timer)
      overlayAnimationTimer.delete(win)
      console.warn('[titlebar] setTitleBarOverlay failed:', error)
      return
    }

    if (t >= 1) {
      clearInterval(timer)
      overlayAnimationTimer.delete(win)
    }
  }, 16)

  overlayAnimationTimer.set(win, timer)
}

function createWindow(): void {
  const initialOverlayColors: TitleBarOverlayColors = nativeTheme.shouldUseDarkColors
    ? { color: '#18181c', symbolColor: '#ffffff' }
    : { color: '#ffffff', symbolColor: '#1f2328' }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: true,
    ...(supportsTitleBarOverlay
      ? {
          titleBarStyle: 'hidden',
          titleBarOverlay: {
            ...initialOverlayColors,
            height: titleBarHeight
          }
        }
      : {}),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (supportsTitleBarOverlay) overlayState.set(mainWindow, initialOverlayColors)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on(
    'theme:changed',
    (
      event,
      payload:
        | boolean
        | {
            dark: boolean
            titleBarOverlay?: { color?: string; symbolColor?: string }
          }
    ) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return

    const dark = typeof payload === 'boolean' ? payload : payload.dark
    nativeTheme.themeSource = dark ? 'dark' : 'light'

    if (!supportsTitleBarOverlay) return
    const defaults: TitleBarOverlayColors = dark
      ? { color: '#18181c', symbolColor: '#ffffff' }
      : { color: '#ffffff', symbolColor: '#1f2328' }
    const override =
      typeof payload === 'boolean'
        ? undefined
        : {
            color: payload.titleBarOverlay?.color,
            symbolColor: payload.titleBarOverlay?.symbolColor
          }

    const to: TitleBarOverlayColors = {
      color: override?.color ?? defaults.color,
      symbolColor: override?.symbolColor ?? defaults.symbolColor
    }
    const from: TitleBarOverlayColors = overlayState.get(win) ?? to
    overlayState.set(win, to)

    try {
      if (from.color === to.color && from.symbolColor === to.symbolColor) {
        setWindowTitleBarOverlay(win, to)
      } else {
        animateWindowTitleBarOverlay(win, from, to)
      }
    } catch (error) {
      console.warn('[theme:changed] setTitleBarOverlay failed:', error)
    }
  }
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
