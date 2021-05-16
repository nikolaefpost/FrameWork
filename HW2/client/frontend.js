import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data(){
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate(){
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods:{
        createContact(){
           const {...contact} = this.form
            this.contacts.push({...contact, id: Date.now(), marked: false})

            this.form.name = this.form.value = ''
        },
        markContact(id){
           const  contact = this.contacts.find(c=>c.id===id)
            contact.marked = true
        },
        removeContact(id){
            this.contacts = this.contacts.filter( c => c.id!==id)
        }
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const header = {}
        let body
        if(data){
            header['Content-Type'] = 'application/json '
            body = JSON.stringify(data)
        }
        const response = fetch(url, {
            method,
            header
        })
        return  await response.json()
    } catch (e) {
        console.warn('Error', e.message)
    }
}