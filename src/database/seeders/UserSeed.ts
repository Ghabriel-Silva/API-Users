import { IUserIput} from "../../app/interfaces/IUser"

const userSeed: IUserIput = {
    name:"Gabriel",
    email: "admin@gmail.com",
    password:"1234",
    birth_date: new Date('2001-08-02'),
    active:true
}

export default userSeed