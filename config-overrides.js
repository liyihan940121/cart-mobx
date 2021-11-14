const { override, addDecoratorsLegacy } = require("customize-cra")
// 这些配置是为了开启decorator语法支持,create-react-app初始化的项目是默认不支持的
module.exports = override(
  addDecoratorsLegacy()
)