const statusList: Indexable = {
  400: '请求失败！请您稍后重试',
  401: '登录失效！请您重新登录',
  403: '当前账号无权限访问！',
  404: '你所访问的资源不存在！',
  405: '请求方式错误！请您稍后重试',
  408: '请求超时！请您稍后重试',
  500: '服务异常！',
  502: '网关错误！',
  503: '服务不可用！',
  504: '网关超时！',
}

export const checkStatus = (status: number) => {
  // if (status == 1024) { ...自定义处理 }
  // TODO: 错误提示
  console.log(statusList[status] ?? '请求失败！')
}
