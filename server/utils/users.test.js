const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users=[
        {
            id: '1',
            name:'Mike',
            room:'Node Course'
        },{
            id: '2',
            name:'Jen',
            room:'React Course'
        },{
            id: '3',
            name:'Julie',
            room:'Node Course'
        }
        ];
    });
    
    
  it('should add new user',()=>{
    var users = new Users();
    var user = {id:'123',name:'Alex',room:'The Office Fans'};
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });
  
 it('should return names for Node Course',()=>{
    var userlist = users.getUserList('Node Course');
    expect(userlist).toEqual(['Mike', 'Julie']);
  });
  
   it('should return names for React Course',()=>{
    var userlist = users.getUserList('React Course');
    expect(userlist).toEqual(['Jen']);
  });
  
   it('should remove a user',()=>{
    var userId = '2';
    var user = users.removeUser(userId);
    expect(user.name).toBe('Jen');
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });  

   it('should not remove user',()=>{
    var userId = '209';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
  
  it('should find a user',()=>{
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
    expect(user.name).toBe('Jen');
  });   
  
  it('should not find a user',()=>{
    var userId = '331';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
  }); 
  
});
