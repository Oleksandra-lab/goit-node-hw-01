const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");
 
  const contactsPath = path.join(__dirname, "db/contacts.json") ;
  console.log(contactsPath);
 


const listContacts = async () => {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts)
  }

  
  
  const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const questedContact= allContacts.find(contact => contact.id === contactId);
    

    console.log(questedContact);
    return questedContact || null;

     }
  
  const removeContact = async(contactId) => {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId)
    if(index === -1){
      return null;
    } 

    const [removedContact] = allContacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2))

    return removedContact
   
  }
  
  const addContact = async (name, email, phone) => {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid,
      name,
      email,
      phone,
    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  }