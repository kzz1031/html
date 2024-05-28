import instance from "@/request/http";

//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数
interface ReqLogin {
    username: string
    password: string
}

interface ReqRegister {
    username: string
    password: string
    first_name: string,
    last_name: string,
    email: string
}

interface UpdateUserInfo {
    username: string
    first_name: string,
    last_name: string,
    email: string
}

interface ReqChatgpt {
    username: string
    original_text: string
    translated_text: string
}

interface ReqChatgptDelete {
    username: string
    time : string
}

interface ReqChatgptHistory {
    username: string
    order_by_time : string
    search_content: string
}

interface ReqChat{
    username: string
}
interface ReqStatus {
    id: string
    navStatus: string
}

interface Collection {
    original_text: string
    translated_text: string
  }
// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理***
type Res<T> = Promise<ItypeAPI<T>>;
// 一般情况下响应数据返回的这三个参数，
// 但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
    success: string | null // 返回状态码的信息，如请求成功等;
    result: T,//请求的数据，用泛型
    msg: string | null // 返回状态码的信息，如请求成功等
    message:string
    code: number //返回后端自定义的200，404，500这种状态码
    user: User
    users: User[]
    histories: History[]
    words : Word[]
    collections: Collection[]
    sum: Sum[]
    total_users: number
    total_pages: number
}

interface User {
    is_active: boolean,
    username: string,
    email: string,
    is_superuser: boolean,
    first_name: string,
    last_name: string
}
interface Sum{
    count: number
}
interface History {
    username: string,
    original_text: string,
    translated_text: string,
    created_at: string
  }

interface WordList {
    username : string,
    word: string,
    meaning : string,
    prop : string,
    rate : number 
}
interface Word {
    word: string,
    meaning : string,
    prop : string,
    rate : number,
    created_at : string,
    updated_at : string, 
    username : string
    
}
//测试hello api
export const TestHello = (): Res<null> =>
    instance.get('/api/hello');

//登录 api
export const LoginApi = (data: ReqLogin): Res<null> =>
    instance.post('/api/login', data);

//注册 api
export const RegisterApi = (data: ReqRegister): Res<null> =>
    instance.post('/api/register', data);

//上传历史记录
export const HistoryApi = (data: ReqChatgpt): Res<null> =>
    instance.post('/api/history', data);

export const InsertWordApi = (data: WordList): Res<null> =>
    instance.post('/api/insertword', data);

export const CollectApi = (data: ReqChatgpt): Res<null> =>
    instance.post('/api/collect', data);


export const GetHistoryApi = (data: ReqChatgptHistory): Res<null> =>
    instance.post(`/api/GetHistory`, data);

export const GetCollectionApi = (data: ReqChat): Res<null> =>
    instance.post(`/api/GetCollection`, data);

export const GetWordApi = (data: ReqChat): Res<null> =>
    instance.post(`/api/GetWord`, data);

export const SuperUserApi = (data: ReqChat): Res<null> =>
    instance.post(`/api/SuperUser`, data);

export const GetHistorySumApi = (data: ReqChat): Res<null> =>
    instance.post(`/api/GetHistorySum`, data);

export const GetActiveUser = (): Res<null> =>
    instance.post(`/api/GetActiveUser`);

export const DeleteHistoryApi = (data: ReqChatgptDelete): Res<null> =>
    instance.post(`/api/DeleteHistory`, data);

export const UpdateUserInfo = (data: UpdateUserInfo): Res<null> =>
    instance.post(`/api/UpdateUserInfo`, data);

//登出 api
export const LogoutApi = (): Res<null> =>
    instance.get('/api/logout');

//根据username查询用户信息api  get
export const GetUserInfoByUserName = (params: { userName: string }): Res<null> =>
    instance.get(`/api/find/${params.userName}`, {params});

//根据pageNumber查询用户信息api  get
export const GetUserInfoByPageNum = (params: { pageNumber: number }): Res<null> =>
    instance.get(`/api/users/list/${params.pageNumber}`, {params});


//以下是模板:
// post请求 ，没参数
export const LogoutAPI = (): Res<null> =>
    instance.post("/admin/logout");

// post请求，有参数,如传用户名和密码
export const loginAPI = (data: ReqLogin): Res<string> =>
    instance.post("/admin/login", data);

// post请求 ，没参数，但要路径传参
export const StatusAPI = (data: ReqStatus): Res<null> =>
    instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`);


//  get请求，没参数，
export const FlashSessionListApi = (): Res<null> =>
    instance.get("/flashSession/list");

// get请求，有参数，路径也要传参  (也可能直接在这写类型，不过不建议,大点的项目会维护一麻烦)
export const ProductCategoryApi = (params: { parentId: number }): any =>
    instance.get(`/productCategory/list/${params.parentId}`, {params});

// get请求，有参数，(如果你不会写类型也可以使用any,不过不建议,因为用了之后 和没写TS一样)
export const AdminListAPI = (params: any): any =>
    instance.get("/admin/list", {params});
