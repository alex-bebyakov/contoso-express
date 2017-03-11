import server from '../server';
import userRepository from "../repositories/userRepository";


const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
server.start({});
let user = resetUser()
let token = null


describe('SignUp', () => {
    it('Delete', done => {
        userRepository.deleteUser(resetUser().username).then(done())
    });
    it('EmailValidationError', done => {
        user = resetUser()
        user.email = 'alex'
        chai.request(server.app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Ошибка валидации данных: ValidationError: child "email" fails because ["email" must be a valid email]');
                done();
            });
    });
    it('Success', done => {
        user = resetUser()
        chai.request(server.app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token').to.equal('userCreated');
                done();
            });
    });
    it('EmailExist', done => {
        user = resetUser()
        user.username = 'mike'
        chai.request(server.app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Пользователь с таким email уже зарегистрирован.');
                done();
            });
    });
    it('UserExist', done => {
        user = resetUser()
        chai.request(server.app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Пользователь с таким именем уже зарегистрирован.');
                done();
            });
    });
})

describe('LogIn', () => {
    user = resetUser()
    it('NotActivated', (done) => {
        chai.request(server.app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Запрашиваемый аккаунт не активирован. Проверьте, пожалуйста, свою почту.');
                done();
            });
    });

    it('WrongPassword', (done) => {
        user = resetUser()
        user.password = '1111111111'
        chai.request(server.app)
            .post('/login')
            .send(user)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Неправильный пароль.');
                done();
            });
    });
    it('WrongName', (done) => {
        user = resetUser()
        user.username = 'Mike'
        chai.request(server.app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Пользователь с таким именем не найден.');
                done();
            });
    });
    it('WrongEmail', (done) => {
        user = resetUser()
        user.username = 'Mike@Mike'
        chai.request(server.app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').to.equal('Пользователь с таким email не найден.');
                done();
            });
    });
    it('GetToken', done => {
        userRepository.findUserByName(resetUser().username).then((user) => {
            token = user.activationToken()
            done()
        })
    });
    //ToDo:Добавить тесты ошибок активации
    it('Activate', (done) => {
        chai.request(server.app)
            .get('/activate/' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token').to.equal('profileActivated');
                done();
            });
    });
    it('Success', (done) => {
        user = resetUser()
        chai.request(server.app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token').to.equal('userLogged');
                done();
            });
    });
})

function resetUser() {
    return {
        username: "Alex",
        password: "123457890",
        email: "Alex0181@yandex.ru"
    }
}