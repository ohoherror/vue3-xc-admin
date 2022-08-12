import listApi from './listApi'
export const config = {
    'userApply': {
        name: "用户申请款",
        hasSelect: true,
        listApi: listApi.userApply,
        tableList: [
            {
                name: '用户编码',
                serachKey: 'wxUserId',
                serachType: 'input',
                serach: true,
                tableKey: 'wxUserId'
            },
            {
                name: '微信号',
                serachKey: 'weixinno',
                serachType: 'input',
                serach: true,
                tableKey: 'weixinno'
            },
            {
                name: '微信昵称',
                serachKey: 'wxUserNickname',
                serachType: 'input',
                serach: false,
                tableKey: 'wxUserNickname'
            },
            {
                name: '订单编号',
                serachKey: 'thirdTradeNo',
                serachType: 'input',
                serach: true,
                tableKey: 'thirdTradeNo',
                width: 250
            },
            {
                name: '提交时间',
                serachKey: 'createdTime',
                serachKey1: "createdBeginTime",
                serachKey2: "createdEndTime",
                serachType: 'date',
                serach: true,
                tableKey: 'createdTime'
            },
        ]
    },
    'news': {
        name: "新闻管理",
        hasSelect: true,
        listApi: listApi.news,
        tableList: [
            {
                name: '文章标题(中文)',
                serachKey: 'title',
                serachType: 'input',
                serach: false,
                tableKey: 'title',
                width: 200

            },
            {
                name: '文章标题(英文)',
                serachKey: 'enTitle',
                serachType: 'input',
                serach: false,
                tableKey: 'enTitle',
                width: 200
            },
            {
                name: '摘要(中文)',
                serachKey: 'summary',
                serachType: 'input',
                serach: false,
                tableKey: 'summary',
                width: 300
            },
            {
                name: '摘要(英文)',
                serachKey: 'enSummary',
                serachType: 'input',
                serach: false,
                tableKey: 'enSummary',
                width: 300
            },
            {
                name: '新闻发布时间',
                serachKey: 'publishTime',
                serachType: 'input',
                serach: false,
                tableKey: 'publishTime',

            },
        ]
    }
}

