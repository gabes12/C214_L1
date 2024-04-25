const { expect, test } = require('@jest/globals')
const { Professor, Professores } = require('.')

/* CASOS DE SUCESSO */

test('should be create a new teachers', () => {
    const teacher = new Professor('Chris', '13:30-15:10', 'Integral', '1')
    const professores = new Professores()
    professores.save(teacher)

    const professoresAfterSave = professores.getAll()
    const professoresArray = JSON.parse(professoresAfterSave)

    expect(professoresArray.length).toBe(6)
})

test('should be find teachers in specific period', () => {
    const professores = new Professores()
    const foundedTeachers = professores.getByPeriod("Integral");
    const jsonToArray = JSON.parse(foundedTeachers)

    expect(jsonToArray.length).toBe(4)
})

test('should be find all teachers in database', () => {
    const professores = new Professores()
    const foundedTeachers = professores.getAll();
    const jsonToArray = JSON.parse(foundedTeachers)

    expect(jsonToArray.length).toBe(5)
})

test('should be find all teachers in database', () => {
    const professores = new Professores()
    const foundedTeachers = professores.getAll();
    const jsonToArray = JSON.parse(foundedTeachers)

    expect(jsonToArray.length).toBe(5)
})

test('should be find a teacher by name', () => {
    const professores = new Professores()
    const foundedProfessor = professores.getTeacherByName("Karina")
    const convertJson = JSON.parse(foundedProfessor)

    expect(convertJson.length).toBe(1)
})

test('should be find a teacher by opening hours', () => {
    const professores = new Professores()
    const foundedHours = professores.getTeacherByOpeningHours("9:00-11:00")
    const convertJson = JSON.parse(foundedHours)

    const professoresWithThisHours = convertJson.map(professor => professor.name)

    expect(professoresWithThisHours).toStrictEqual(['Daniela', 'Pedro'])
})

test('should be delete a teacher by name', () => {
    const professores = new Professores()
    const foundedTeachers = professores.removeTeacherOfList("Daniela")
    const convertJson = JSON.parse(foundedTeachers)


    expect(convertJson.professores.length).toBe(4)
    expect(convertJson.status).toBe(200)
})

test('should be found all of teachers of specific room', () => {
    const professores = new Professores()
    const foundedTeachers = professores.getTeachersByRoom("8")
    const convertJson = JSON.parse(foundedTeachers)


    expect(convertJson.professores.length).toBe(1)
    expect(convertJson.status).toBe(200)
})

test('should be clear teachers list', () => {
    const professores = new Professores()
    const cleared = professores.clearTeacherList()
    const convertJson = JSON.parse(cleared)


    expect(convertJson.professores.length).toBe(0)
    expect(convertJson.status).toBe(200)
})

test('should be found a teacher in a specific room and specific period', () => {
    const professores = new Professores()
    const founded = professores.getTeacherByRoomAndPeriod(5, "Integral")
    const convertJson = JSON.parse(founded)


    expect(convertJson.professores.length).toBe(1)
    expect(convertJson.status).toBe(200)
})


/* CASOS DE ERRO */

test('should not be create a new teacher with room greater than 25', () => {
    const teacher = new Professor('Chris', '13:30-15:10', 'Integral', '26')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('Sala inexistente');
})

test('should not be create a new teacher without a room', () => {
    const teacher = new Professor('Chris', '13:30-15:10', 'Integral', '')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('Sala inexistente');
})

test('should not be create a new teacher with a room less than 1', () => {
    const teacher = new Professor('Chris', '13:30-15:10', 'Integral', '0')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('Sala inexistente');
})

test('should not be create a new teacher without name', () => {
    const teacher = new Professor('', '13:30-15:10', 'Integral', '1')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('O professor precisa de um nome');
})

test('should not be create a new teacher without opening hours', () => {
    const teacher = new Professor('Chris', '', 'Integral', '1')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('O professor precisa de um horário de atendimento');
})

test('should not be create a new teacher without period', () => {
    const teacher = new Professor('Chris', '13:30-15:10', '', '1')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('O professor precisa atender em um período');
})

test('should not be create a new teacher without same name that other teacher', () => {
    const teacher = new Professor('Karina', '13:30-15:10', '13:30-15:10', '1')
    const professores = new Professores()

    expect(() => professores.save(teacher)).toThrow('Já existe um professor com esse nome. Adicione um sobrenome para distinguir');
})

test('should not be found a teacher not exist', () => {
    const professores = new Professores()

    expect(() => professores.getTeacherByName("Soned")).toThrow("Não existe professor com esse nome no banco de dados")
})

test('should not be found a teacher in opening hour that not exist', () => {
    const professores = new Professores()

    expect(() => professores.getTeacherByOpeningHours('00:00-1:30')).toThrow("Não existe nenhum professor atendendo no horário especificado")
})

test('should not be delete some teacher that not exists in database', () => {
    const professores = new Professores()

    expect(() => professores.removeTeacherOfList("Soned")).toThrow("Professor não encontrado")
})

test('should not be found a teacher in specific room', () => {
    const professores = new Professores()

    expect(() => professores.getTeachersByRoom("7")).toThrow('Nenhum professor da atendimento nessa sala')
})

test('should not be clear list professor if this is empty', () => {
    const professores = new Professores()

    professores.clearTeacherList()
    
    expect(() => professores.clearTeacherList()).toThrow('A lista já está vazia')
})

test('should not find a teacher whose room does not coexist with the period', () => {
    const professores = new Professores()
    
    // Sala 12 só existe no Integral
    expect(() => professores.getTeacherByRoomAndPeriod('12', 'Noturno')).toThrow("Não há nenhum professor nessa sala no período procurado")
})