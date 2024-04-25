class Professor {
    constructor(name, atendimento, periodo, sala) {
        this.name = name;
        this.atendimento = atendimento;
        this.periodo = periodo;
        this.sala = sala;
    }
}


class Professores {
    constructor() { }

    professoresList = [
        {
            name: "Luiz",
            atendimento: "13:30-15:10",
            periodo: "Integral",
            sala: 12,
        },
        {
            name: "Karina",
            atendimento: "19:30-21:10",
            periodo: "Noturno",
            sala: 8,
        },
        {
            name: "Carlos",
            atendimento: "14:00-16:00",
            periodo: "Integral",
            sala: 5,
        },
        {
            name: "Daniela",
            atendimento: "9:00-11:00",
            periodo: "Integral",
            sala: 10,
        },
        {
            name: "Pedro",
            atendimento: "9:00-11:00",
            periodo: "Integral",
            sala: 3,
        }
    ];

    save(professor) {
        let predio = [];

        if (professor.name.trim().length == 0) throw new Error('O professor precisa de um nome');
        if (this.professoresList.some(teacher => teacher.name == professor.name)) throw new Error("Já existe um professor com esse nome. Adicione um sobrenome para distinguir")
        if (professor.atendimento.trim().length == 0) throw new Error('O professor precisa de um horário de atendimento');
        if (professor.periodo.trim().length == 0) throw new Error('O professor precisa atender em um período');
        if (parseInt(professor.sala) > 25 || parseInt(professor.sala) < 1 || professor.sala.trim().length == 0) throw new Error('Sala inexistente')

        switch (professor.sala) {
            case 1, 2, 3, 4, 5:
                predio = [1];
                break;
            case 6, 7, 8, 9, 10:
                predio = [2];
                break;
            case 11, 12, 13, 14, 15:
                predio = [3];
                break;
            case 16, 17, 18, 19, 20:
                predio = [4];
                break;
            case 21, 22, 23, 24, 25:
                predio = [6];
                break;
            default:
                break;
        }

        const newProfessor = {
            nomeDoProfessor: professor.name,
            horarioDeAtendimento: professor.atendimento,
            periodo: professor.periodo,
            sala: professor.sala,
            predio: predio,
        };

        this.professoresList.push(newProfessor);
    }

    getByPeriod(period) {

        if (!this.professoresList.some(({ periodo }) => periodo === period)) {
            throw new Error('Não existe professores cadastrados no periodo procurado');
        }
        return JSON.stringify(this.professoresList.filter(({ periodo }) => periodo === period))
    }

    getAll() {
        return JSON.stringify(this.professoresList)
    }

    getTeacherByName(name) {
        if (!this.professoresList.some(professor => professor.name == name)) throw new Error("Não existe professor com esse nome no banco de dados")

        return JSON.stringify(this.professoresList.filter((professor) => professor.name === name));
    }

    getTeacherByOpeningHours(openingHours) {
        if(!this.professoresList.some(professor => professor.atendimento == openingHours)) throw new Error("Não existe nenhum professor atendendo no horário especificado")

        return JSON.stringify(this.professoresList.filter(({ atendimento }) => atendimento === openingHours));
    }

    removeTeacherOfList(name){
        if(!this.professoresList.some(professor => professor.name == name)) throw new Error("Professor não encontrado")
        const positionOfTacherWillBeDeleted = this.professoresList.findIndex(professor => professor.name == name)
        this.professoresList.splice(positionOfTacherWillBeDeleted, 1)

        return JSON.stringify({
            status: 200,
            professores: this.professoresList
        })
    }

    getTeachersByRoom(room){
        if(!this.professoresList.some(professor => professor.sala == room)) throw new Error("Nenhum professor da atendimento nessa sala")

        return JSON.stringify({
            status: 200,
            professores: this.professoresList.filter(professor => professor.sala == room)
        })
    }

    clearTeacherList(){
        if(this.professoresList.length == 0) throw new Error("A lista já está vazia")

        this.professoresList = []

        return JSON.stringify({
            status: 200,
            professores: this.professoresList
        })
    }

    getTeacherByRoomAndPeriod(room, period){
        if(!this.professoresList.some(professor => professor.sala == room && professor.periodo == period)) 
            throw new Error("Não há nenhum professor nessa sala no período procurado")

            return JSON.stringify({
                status: 200,
                professores: this.professoresList.filter(professor => professor.sala == room && professor.periodo == period)
            })
    }

}

module.exports = { Professor, Professores }