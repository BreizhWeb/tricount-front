<template>
    <div>
      <h2>Ajouter une catégorie de dépense</h2>
      <form @submit="ajouterCategorie">
        <input type="text" v-model="nouvelleCategorie" placeholder="Nom de la catégorie" required />
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
    <h2>Liste des catégories de dépense</h2>
      <ul>
        <li v-for="depense in depenses" :key="depense.id">{{ depense.montant }}</li>
      </ul>
</template>
<script>
export default {
    name:'HomeView',
    data() {
        return {
            montant: 0,
            date: '',
            categorie: '',
            nouvelleCategorie: '',
            participants: [],
            users: [],
            categories: [],
            depenses: []

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
        recupererDépenses() {
            // Envoyer une requête GET pour récupérer la liste des dépenses
            // Assurez-vous d'ajuster l'URL selon votre API
            fetch('http://localhost:3000/depense')
                .then(response => response.json())
                .then(data => {
                // Mettre à jour la liste des dépenses avec les données récupérées
                    this.depenses = data.data;
                    this.depenses = data.data;
                    console.log(this.depenses);
                this.depenses = data.data;
                    console.log(this.depenses);
                })
            .catch(error => {
                console.error('Erreur lors de la récupération des dépenses:', error);
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
                    this.categories = data.data;
                    console.log(this.categories);
                this.categories = data.data;
                    console.log(this.categories);
                })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories:', error);
            });
        },
        recupererUtilisateurs() {
            // Envoyer une requête GET pour récupérer la liste des utilisateurs
            // Assurez-vous d'ajuster l'URL selon votre API
            fetch('http://localhost:3000/user')
                .then(response => response.json())
                .then(data => {
                // Mettre à jour la liste des utilisateurs avec les données récupérées
                this.users = data.data;
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
            date: currentDate,
            id_categorie_depense: this.categorie,
            participants: this.participants
            })
        })
            .then(response => response.json())
            .then(data => {
            // Réinitialiser les champs du formulaire
            this.montant = 0;
            this.categorie = '';
            this.participants = [];
            
            // Ajouter la dépense sur chaque utilisateur sélectionné
            this.participants.forEach(participant => {
                fetch('http://localhost:3000/participation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_depense: data.id, // Utiliser l'ID de la dépense créée précédemment
                    id_utilisateur: participant
                })
                })
                .then(response => response.json())
                .catch(error => {
                    console.error('Erreur lors de l\'ajout de la participation:', error);
                });
            });
            
            // Effectuer des actions supplémentaires après l'ajout de la dépense si nécessaire
            })
            .catch(error => {
            console.error('Erreur lors de l\'ajout de la dépense:', error);
            });
        }
    },
    mounted() {
        this.recupererDépenses();
        this.recupererCategories();
        this.recupererUtilisateurs();
    }
};
</script>