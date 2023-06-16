<template>
    <div class="center">
      <h1>Connexion</h1>
      <div class="login">
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="mdp" placeholder="Mot de passe" />
        <button @click="login">Se connecter</button>
      </div>
      <div>
        <router-link to="/register">
          <button class="link">S'inscrire</button>
        </router-link>
      </div>
    </div>
</template>
<script>
    import bcrypt from 'bcryptjs'
    import axios from 'axios'
  
    export default {
        name: 'LoginView',
        data() {
        return {
            email: '',
            mdp: '',
        };
        },
        methods: {
        async login() {
            try {
            const response = await axios.get('http://localhost:3000/user', {
                params: {
                email: this.email,
                },
            });
    
            if (response.status === 200) {
                const users = response.data.data; // Tous les utilisateurs dans la réponse

                let userFound = false;
                let passwordMatch = false;

                for (const user of users) {
                if (user.email === this.email) {
                    userFound = true;

                    // Vérifier le mot de passe pour l'utilisateur correspondant à l'e-mail
                    passwordMatch = await bcrypt.compare(this.mdp, user.mdp);
                    break;
                }
                }

                if (userFound) {
                if (passwordMatch) {
                    alert("Connexion réussie !");
                    this.$router.push('Home');
                } else {
                    alert("Le mot de passe est incorrect.");
                }
                } else {
                alert("L'utilisateur n'existe pas.");
                }
            }
            } catch (error) {
            console.error(error);
            }
        },
    },
  };
</script>
<style>
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.logo {
    width:100px
}
.login input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}
.login button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: skyblue;
    color: white;
    cursor: pointer;
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
</style>