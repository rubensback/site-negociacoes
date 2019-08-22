class NegociacaoService{

    obterNegociacoesSemana(){
        this.obterNegociacoes("GET","negociacoes/semana");
    }

    obterNegociacoesSemanaAnterior(cb){
        this.obterNegociacoes("GET","negociacoes/anterior",cb);
    }

    obterNegociacoesSemanaRetrasada(cb){
        this.obterNegociacoes("GET","negociacoes/retrasada",cb);
    }

    obterTodasNegociacoes(cb){
        this.obterNegociacoesSemana(cb);
        this.obterNegociacoesSemanaAnterior(cb);
        this.obterNegociacoesSemanaRetrasada(cb);
    }

    /*obterNegociacoes(requisicao,endereco,cb){
        let xhr = new XMLHttpRequest();
        xhr.open(requisicao,endereco);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200){
                    cb(null,JSON.parse(xhr.responseText)
                     .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor))) //converter cada objeto listado em uma instancia de negociacao
                }else{
                    console.log(xhr.responseText);
                    cb("Não foi possível obter as negociações do servidor.",null)     ;               
                }
            }
        }
        xhr.send();
    }*/

    obterNegociacoes(){
        return new Promise((resolve,reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("GET","negociacoes/semana");
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                         .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor))) //converter cada objeto listado em uma instancia de negociacao
                    }else{
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações do servidor.",null);               
                    }
                }
            }
            xhr.send();
        })
    }
}