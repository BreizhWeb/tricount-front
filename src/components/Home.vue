<template>
    <div>
      <h2>Ajouter une catégorie de dépense</h2>
      <form @submit="ajouterCategorie">
        <input type="text" v-model="nouvelleCategorie" placeholder="Nom de la catégorie" />
        <button type="submit">Ajouter</button>
      </form>
  
      <h2>Liste des catégories de dépense</h2>
      <ul>
        <li v-for="categorie in categories" :key="categorie.id">{{ categorie.nom }}</li>
      </ul>
    </div>
    <h2>Ajouter une dépense</h2>
    <form @submit="ajouterDepense">
      <label for="montant">Montant :</label>
      <input type="number" v-model="montant"  step="0.01" required />

      <label for="categorie">Catégorie de dépense :</label>
      <select v-model="categorie" required>
        <option v-for="categorie in categories" :value="categorie.id" :key="categorie.id">{{ categorie.nom }}</option>
      </select>

      <label for="participants">Participants :</label>
      <select v-model="participants" multiple required>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.nom }}</option>
      </select>

      <button type="submit">Ajouter</button>
    </form>
</template>
<script>
export default {
    name:'HomeView',
    data() {
        return {
            montant: 0,
            date: '',
            categorie: '',
            participants: [],
            users: [],
            nouvelleCategorie: '',
            categories: []
        };
    },
    methods: {
        ajouterCategorie(event) {
        event.preventDefault();
        // Envoyer une requête POST pour ajouter une catégorie
        // Assurez-vous d'ajuster l'URL et les données selon votre API
        fetch('http://localhost:3000/categorieDepense', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: this.nouvelleCategorie })
        })
        .then(response => response.json())
        .then(data => {
            // Réinitialiser le champ de saisie
            this.nouvelleCategorie = '';
            // Mettre à jour la liste des catégories avec la nouvelle catégorie ajoutée
            this.categories.push(data);
            this.recupererCategories();
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
        });
        },
        recupererCategories() {
            // Envoyer une requête GET pour récupérer la liste des catégories
            // Assurez-vous d'ajuster l'URL selon votre API
            fetch('http://localhost:3000/categorieDepense')
                .then(response => response.json())
                .then(data => {
                // Mettre à jour la liste des catégories avec les données récupérées
                    this.categories = data.data;
                    console.log(this.categories);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des catégories:', error);
                });
            fetch('http://localhost:3000/user')
                .then(response => response.json())
                .then(data => {
                    // Mettre à jour la liste des utilisateurs avec les données récupérées
                    this.users = data.data;
                    console.log(this.categories);

                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des utilisateurs:', error);
                });
        },
        ajouterDepense(event) {
        event.preventDefault();
        const currentDate = new Date();

        // Envoyer une requête POST pour ajouter une dépense
        // Assurez-vous d'ajuster l'URL et les données selon votre API
        fetch('http://localhost:3000/depense', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                montant: this.montant,
                date:  currentDate,
                id_categorie_depense: this.categorie,
                id_utilisateur_payeur: this.participants[0], // Supposons que le payeur est le premier participant sélectionné
                participants: this.participants
            })
        })
            .then(response => response.json())
            .then(data => {
                // Réinitialiser les champs du formulaire
                this.montant = 0;
                this.date = '';
                this.categorie = '';
                this.participants = [];
                // Effectuer des actions supplémentaires après l'ajout de la dépense si nécessaire
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la dépense:', error);
            });
        },
    },
    mounted() {
        // Appeler la méthode pour récupérer les catégories au chargement de la page
        this.recupererCategories();
    }
};
</script>