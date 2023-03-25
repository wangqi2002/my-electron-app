/* // main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')

    // 打开开发工具
    //   mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。 */


// 在主进程中.
/* const { app, BrowserView, BrowserWindow } = require('electron')

app.whenReady().then(() => {
    const win = new BrowserWindow({ width: 800, height: 600 })

    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    //   view.webContents.loadURL('https://www.baidu.com/')
    view.webContents.loadFile('index.html')
}) */

function addwv() {                                              // 加载BrowserView，单独写个函数，方便看代码
    var view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({ x: 0, y: 50, width: 1000, height: 680 })
    view.webContents.loadURL('https://electronjs.org')
}

const { app, BrowserView, BrowserWindow } = require('electron')

app.on('ready', () => {
    mainWindow = new BrowserWindow({/*省略一堆参数*/ })
    mainWindow.loadFile('index.html')                         // 加载一个本地文件

    // 解决方法1

    mainWindow.webContents.on('did-stop-loading', () => {       // 随便找个时机，加载BrowserView(必须是墨迹的did-stop-loading,没有loadFile给did-stop-loading墨迹,该方法会失效)
        /* 不要傻傻的直接复制，看看自己的new的BrowserWindow名字叫啥 */
        addwv()
    })

    // 解决方法2
    // const { setTimeout } = require('timers')                    // 写不写都行，写了时间更准
    // setTimeout(function () {                                    // 或者这个时机，加载BrowserView
    //     addwv()
    // }, 10)
    // addwv()

    // 解决方法3
    // addwv()                                                  // 在加载BrowserView的附近，小小的改动一下窗口尺寸，触发bug
    // 使用 setFullScreen 触发 BrowserView 的正常显示，是魔法，不要动
    // mainWindow.setFullScreen(true);mainWindow.setFullScreen(false)/* 不要傻傻的直接复制，看看自己的new的BrowserWindow名字叫啥 */
})
