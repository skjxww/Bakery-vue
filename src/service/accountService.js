import common_util from "@/util/common_util.js";
const _account_service= {
    // 注册
    signup:function (account){
        common_util.post(
            'http://localhost:8080/accounts',
            {password:account.password},
            {
                email: account.email,
                username: account.username
            },
            (data)=>{
                const {token,...restData}=data;
                console.log(token);
                Object.assign(account,restData);
                common_util.storeAccessToken(data.token)
                this.updateAccount(account);
            }
        )
    },
    // 更新用户信息
    updateAccount:function (account){
        const updateData = {
            username:account.username,
            phone:account.phone,
            age:account.age,
            gender:account.gender,
            addr1:account.addr1,
            addr2:account.addr2,
            avatar_url:account.avatar_url
        }
        common_util.put(`http://localhost:8080/accounts/${account.userid}`,
            JSON.stringify(updateData),
            {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ()=>{});
    },
    // 换密码
    resetPassword:function (newPassword,userid){
        common_util.post(`http://localhost:8080/accounts/${userid}/password`,
            {password:newPassword},
            {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            ()=>{
            });
    },
    // -------------------------------------------------------登录--------------------------------------
    signOut:()=>{
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        common_util.delete('http://localhost:8080/auth',{},()=>{})
        common_util.deleteAccessToken()
    },
}
export default _account_service