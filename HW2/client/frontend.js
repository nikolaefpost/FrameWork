import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

Vue.component('loader',{
    template:`
    <div>
         <p class="inline-flex items-center px-4 py-2  text-base leading-6 font-medium text-white  transition ease-in-out duration-150 cursor-not-allowed" >
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            please wait ...
        </p>
    </div>
    `
})

new Vue({
    el: '#app',
    data(){
        return {
            loading: false,
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
        async createContact(){
            const {...contact} = this.form

            const newContact = await request('/api/v1/users', 'POST',  contact)
            if (newContact.massage){
                alert(newContact.massage)
                return
            }
            this.contacts.push(newContact)
            console.log(newContact)

            this.form.name = this.form.value = ''
        },
        async markContact(id){
            const {...change_contact} = this.form
            const  contact = this.contacts.find(c=>c.id===id)
            const updated = await request(`/api/v1/users${id}`,'PUT', {
                ... contact,
                name: change_contact.name,
                value: change_contact.value,
                marked: false
            })
            if (updated.massage){
                alert(updated.massage)
                return
            }
            contact.marked = true
            contact.name = updated.name
            contact.value = updated.value
            this.form.name = this.form.value = ''
        },
        async removeContact(id){
            await request(`/api/v1/users${id}`,'DELETE')
            this.contacts = this.contacts.filter( c => c.id!==id)
        }
    },
    async mounted(){
        this.loading = true
        this.contacts  = await  request('/api/v1/users')
        this.loading = false

    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}