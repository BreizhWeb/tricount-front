<template>
    <h1>Inscription</h1>
    <div class="register">
        <p>Nom</p>
        <input type="text" v-model="nom" placeholder="Nom" />
        <div v-if="errors.nom" class="error">{{ errors.nom }}</div>
        <p>Prénom</p>
        <input type="text" v-model="prenom" placeholder="Prénom" />
        <div v-if="errors.prenom" class="error">{{ errors.prenom }}</div>
        <p>Email</p>
        <input type="text" v-model="email" placeholder="Email" />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
        <div v-if="registrationError" class="error">{{ registrationError }}</div>
        <p>Mot de passe</p>
        <input type="text" v-model="mdp" placeholder="Mot de passe" />
        <div v-if="errors.mdp" class="error">{{ errors.mdp }}</div>
        <button v-on:click="Register" v-on:focus="clearError">S'inscrire</button>
    </div>
    <div>
        <router-link to="/">
            <button class="link">Vous avez déjà un compte</button>
        </router-link>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data()
  {
    return {
        nom:"",
        prenom:"",
        email:"",
        mdp:"",
        errors: {
            nom: "",
            prenom: "",
            email: "",
            mdp: ""
        },
        registrationError: ""
    }
  },
  methods:{
    async Register() {
        if (this.validateForm()) {
            // Continuer le processus d'inscription si le formulaire est valide
            try {
            const response = await axios.post("http://localhost:3000/user", {
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                mdp: this.mdp
            });

            if (response.status === 200) {
                alert("Vous êtes enregistré.");
            }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    this.registrationError = "L'adresse e-mail est déjà utilisée.";
                } else {
                    this.registrationError = "Une erreur est survenue lors de l'inscription.";
                    console.error(error);
                }
            }
        }
    },
    validateForm() {
        this.errors = {
        nom: "",
        prenom: "",
        email: "",
        mdp: "",
        };

        let isValid = true;
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


        if (!this.nom) {
        this.errors.nom = "Veuillez saisir votre nom.";
        isValid = false;
        }

        if (!this.prenom) {
        this.errors.prenom = "Veuillez saisir votre prénom.";
        isValid = false;
        }

        if (!this.email || !emailRegex.test(this.email)) {
        this.errors.email = "Veuillez saisir une adresse e-mail valide.";
        isValid = false;
        }

        if (!this.mdp || !mdpRegex.test(this.mdp)) {
        this.errors.mdp = "Veuillez saisir un mot de passe valide (8 caractères minimum, avec au moins une lettre majuscule, une lettre minuscule et un chiffre).";
        isValid = false;
        }

        return isValid;
    },
    clearError() {
        this.registrationError = "";
    },
  }
}
</script>
<style>
.logo {
    width:100px
}
.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}
.register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: skyblue;
    color: white;
    cursor: pointer;
    margin-top: 30px;
}
.link {
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  width: 320px;
  height: 40px;
  color: black;
}
.error {
    color: red;
    margin-top: 5px;
  }
</style>