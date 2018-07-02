
开发中  7 查看 编辑 删除           发布   保存（编辑）
待审核  5 查看                    通过   驳回
已驳回  6 查看      删除        关闭
已发布  1 查看 编辑  删除        下线     编辑
已下线  8 查看      删除      再发布

1、新建 选择 场景开发者 有没有限制 ？ 所有开发者
2、场景类型 自用  （企业名称有没有校验）
3、SDK 自用
4、使用技术 使用能力库  联动
5、场景应用及版本  校验 规则 ？
    版本需要跟选择系统环境能够对应上 什么时候校验
    跳转到sdk管理页面 -》 查看 点击下载


1、新建
类型名称  必填 20  重复校验
场景类型说明  可填 500  20字提示


场景说明  可填 200  20字提示

6X22M

n0049269


对外用户属性

注册状态
失败——对应操作按钮：查看                 0
成功——对应操作按钮：查看 编辑 注销 禁用    3
已注销——对应操作按钮：查看               4
已禁用——对应操作按钮：查看 注销 恢复       6


列表   用户ID、用户账号、账号类型、注册照片、注册来源、开通场景&识别次数、注册时间、注册状态


对内 用户属性4

用户ID、用户账号、【用户姓名】、账号类型、【预置照片】、注册照片、注册来源、开通场景&识别次数、【所属分组】、注册时间、注册状态

对内 用户属性
8、注册状态
失败——对应操作按钮：查看 编辑 删除       0
成功——对应操作按钮：查看 编辑 注销 删除    3
已注销——对应操作按钮：查看 删除         4
未注册——对应操作按钮：查看 编辑 删除       5

恢复 3
注销 4
禁用 6
1 通过
5 待处理
6 已驳回

    watch: {
        'ruleForm.applicationScope': {
            handler(newVal, oldVal) {
                console.log('更改场景默认值', this.ruleForm.applicationScope);
            }
        }
    },
    
// 修改数据
        (res.data || []).forEach(item => {
            (item.commonSceneList || []).forEach((nweItem, key) => {
                if (key === 0) {
                    nweItem.hasRootMerchant = true;
                    nweItem. allowBoundCustomMerchant = true;
                }

                if (key === 1) {
                    nweItem.hasRootMerchant = false;
                    nweItem. allowBoundCustomMerchant = true;
                }

                if (key === 2) {
                    nweItem.hasRootMerchant = true;
                    nweItem. allowBoundCustomMerchant = false;
                }

                if (key === 3) {
                    nweItem.hasRootMerchant = false;
                    nweItem. allowBoundCustomMerchant = false;
                }

            });
        });    