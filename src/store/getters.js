const getters = {
  // 用户
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  rcInfo: state => state.chat.rcInfo,
	friendInfo:state => state.chat.friendInfo,
  aliSTSAuth: state => state.user.aliSTSAuth,
	rongIM: state => state.user.rongIM

  /* sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  webUrl: state => state.user.webUrl*/
}
export default getters
