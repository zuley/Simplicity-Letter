// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: "love-letter-5gc2te6l55839c5b"
})

// 云函数入口函数
exports.main = async (event, context) => {
  
  await cloud.openapi.uniformMessage.send({
    touser: 'oOlPS4tP4ADeVjdaGq4NqEWu01B4',
		weappTemplateMsg: {
			page: "pages/index/index",
			data: {
				date2: {
					value: "更新时间"
				},
				thing1: {
					value: "2333"
				}
			},
			templateId: "tQ1G1K-ur5lCeVZaOkXx-xVW83hJhAC3f6MngUCoiVg",
			formId: "522",
			emphasisKeyword: ""
		}
  })

  return 'success'
}