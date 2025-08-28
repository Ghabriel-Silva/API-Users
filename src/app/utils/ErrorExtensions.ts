//Basicamente herda tudo que tem o erro porém adciona um atributo status 
class ErrorExtension extends Error {
    status:number;

    constructor(status:number, message:string){
        super(message);
        this.status = status;
    }
}

export default ErrorExtension

