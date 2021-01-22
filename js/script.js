class User {
    constructor(name, email, address, phone) {
        this.data = {
            name: name,
            email: email,
            address: address,
            phone: phone
        };
    }

    get get() {
        return this.data;
    }
}

class Contacts {
    constructor() {
        this.users = [];
    }

    add(name, email, address, phone) {
        const user = new User(name, email, address, phone);
        const myUser = user.get;
        this.users.push({id: this.users.length, ...myUser});
    }

    edit(id, name, email, address, phone){
       this.users[id].name = name;
       this.users[id].email = email;
       this.users[id].address = address;
       this.users[id].phone = phone;  
    }

    remove(id) {
        delete this.users[id];
    }

    get get() {
        return this.users;
    }
}

class ContactsApp extends Contacts{
    constructor() {
        super();
    }

    display() {
        const form = document.createElement('form');
        form.classList.add('todo-form');
        form.innerHTML = `
            <input id="todoInputName" type="text" class="todo-input" placeholder="Введите имя">
            <input id="todoInputEmail" type="text" class = "todo-input" placeholder="Введите Email">
            <input id="todoInputAddress" type="text" class = "todo-input" placeholder="Введите адрес">
            <input id="todoInputPhone" type="text" class = "todo-input" placeholder="Введите номер телефона">
            <div class="button-conteiner">
                <button id="todoButtonAdd" type="submit" class="todo-button">Add</button>
                
            </div>
        `;
        form.addEventListener('submit', (event) => {
            const self = this;
            event.preventDefault();
            const name = event.currentTarget[0].value;
            const email = event.currentTarget[1].value;
            const address = event.currentTarget[2].value;
            const phone = event.currentTarget[3].value;
            event.currentTarget[0].value = event.currentTarget[1].value = event.currentTarget[2].value = event.currentTarget[3].value = '';
            self.add(name, email, address, phone);  // зачем добавлять self вместо this

        if(document.getElementById('contactsBlock')) {
            document.getElementById('contactsBlock').remove();
            console.log(document.getElementById('contactsBlock'));
        }
            this.displayContacts();
        
        });
        document.body.appendChild(form);
    }

    editModalWindow( CONTACT_ID, userData ) {
        const {id, name, email, address, phone} = userData;
        
        const editBlock = document.getElementById(CONTACT_ID);
                
        const editForm = document.createElement('div');        
        const inputName = document.createElement('input');
        const inputEmail = document.createElement('input');
        const inputAddress = document.createElement('input');
        const inputPhone = document.createElement('input');
                
        inputName.value = name;   
        inputEmail.value = email;       
        inputAddress.value = address;     
        inputPhone.value = phone;
        
        editForm.appendChild(inputName);
        editForm.appendChild(inputEmail);
        editForm.appendChild(inputAddress);
        editForm.appendChild(inputPhone);
        editBlock.appendChild(editForm);

        const saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        saveButton.classList.add('todo-button');
        editForm.appendChild(saveButton);
        
        saveButton.addEventListener('click', () => {
            let newId = +CONTACT_ID.replace('_', '');
            this.edit(newId, inputName.value, inputEmail.value, inputAddress.value, inputPhone.value);

            if(document.getElementById(CONTACT_ID)) {
                document.getElementById(CONTACT_ID).remove();
                document.getElementById('contactsBlock').querySelector('button').remove();
                document.getElementById('contactsBlock').querySelector('button').remove();
            } 

           this.displayContacts();
           
        });      
    }   

    displayContacts() {
        const users = this.get;
        const self = this;

        const contactsBlock = document.createElement('div');
        contactsBlock.id = 'contactsBlock';
        users.map(user => {
            const contact = document.createElement('div');
            const CONTACT_ID ='_' + user.id;
            contact.id = CONTACT_ID;
            contact.innerHTML = `
                name: ${user.name} <br>
                email: ${user.email} <br>
                address: ${user.address} <br>
                phone: ${user.phone}
            `;
            const remove = document.createElement('button');
            remove.innerHTML = 'delete';
            remove.classList.add('todo-button');
            remove.addEventListener('click', () => {
                self.remove(user.id);
                this.displayContacts();
                debugger
            });

            contactsBlock.appendChild(remove);

            const edit = document.createElement('button');
            edit.innerHTML = 'edit';
            edit.classList.add('todo-button');
            edit.addEventListener('click', () => {
                this.editModalWindow(CONTACT_ID, user);
            });

            contactsBlock.appendChild(edit);
            contactsBlock.appendChild(contact);     
                   
        });

        document.body.appendChild(contactsBlock);
    }
    
}


const app = new ContactsApp(); 
app.display();



// (_ => {

//     window.addEventListener('load', _ => {

//         // document.cookie = 'user=Alex';
//         // document.cookie = 'login=user-alex';

//         // document.cookie = 'user=Bob';
//         // document.cookie = 'info=' + encodeURIComponent('Далеко-далеко за горами!');

//         // console.log(decodeURIComponent('%D0%94%D0%B0%D0%BB%D0%B5%D0%BA%D0%BE-%D0%B4%D0%B0%D0%BB%D0%B5%D0%BA%D0%BE%20%D0%B7%D0%B0%20%D0%B3%D0%BE%D1%80%D0%B0%D0%BC%D0%B8!'));

//         // document.cookie = 'user2=Peter; path=/news/post/post1';
//         // document.cookie = 'user3=Mike; domain=127.0.0.1';

//         // let date = new Date(Date.now() + 20000);
//         // date = date.toUTCString();

//         // // document.cookie = 'user4=Bill; expires=' +date;

//         // // document.cookie = 'user5=Gates; max-age=20';
//         // document.cookie = 'user6=Alex; secure';

//         // console.log(document.cookie);  

//     });
// })();