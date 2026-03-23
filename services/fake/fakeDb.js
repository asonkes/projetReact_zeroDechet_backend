// Représente une fausse API avant Mongo

const ingredients = [
  {
    id: 1,
    name: "Asperge blanche",
    slug: "asperge-blanche",
    category: "légume",
    img: "",
    description:
      "Asperge douce et tendre, parfaite cuite à la vapeur ou grillée.",
    consumption: ["avril", "mai", "juin"],
    recipe: [
      { slug: "risotto_legumes_verts" },
      { slug: "veloute_asperges_vertes_blanches" },
      { slug: "asperges_roti_laurent_mariotte" },
      { slug: "gaspacho_asperges_miso" },
    ],
  },
  {
    id: 2,
    name: "Asperge verte",
    slug: "asperge-verte",
    category: "légume",
    img: "",
    description: "Asperge croquante et parfumée, idéale en salade ou sautée.",
    consumption: [
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    recipe: [
      { slug: "risotto_legumes_verts" },
      { slug: "veloute_asperges_vertes_blanches" },
      { slug: "asperges_roti_laurent_mariotte" },
      { slug: "gaspacho_asperges_miso" },
    ],
  },
];

const recipes = [
  {
    id: 1,
    slug: "asperges_roti_laurent_mariotte",
    name: "Asperges blanches et vertes rôties",
    category: "entrée",
    description:
      "Asperges rôties au four avec une sauce à base d'œuf, moutarde, parmesan et huile de pépins de raisin.",
    price: "bon marché",
    number: 1,
    timing_preparation: 30,
    cooking: 15,
    ingredients: [
      { slug: "asperge_verte", quantity_person: 200, unity: "g" },
      {
        slug: "asperge_blanche",
        quantity_person: 200,
        unity: "g",
      },
      { slug: "oeuf", quantity_person: 0.25, unity: "pièce" },
      { slug: "parmesan_rape", quantity_person: 20, unity: "g" },
      { slug: "moutarde", quantity_person: 1, unity: "c.à.s" },
      { slug: "ail", quantity_person: 0.25, unity: "gousse" },
      { slug: "huile_olive", quantity_person: 1, unity: "c.à.s" },
      {
        slug: "huile_pepin_raison",
        quantity_person: 1,
        unity: "c.à.s",
      },
      { slug: "cerfeuil", quantity_person: 1, unity: "pincée" },
      { slug: "sel", quantity_person: 1, unity: "pincée" },
      { slug: "poivre", quantity_person: 1, unity: "tour" },
    ],
    preparation: [
      "Étape 1: Préchauffer le four à 170°C.",
      "Étape 2: Laver les asperges. Éplucher les asperges blanches à moitié et couper la base. Retirer les picots des asperges vertes et couper la base. Disposer sur une plaque de four recouverte de papier cuisson, arroser d’huile d’olive, saler et poivrer.",
      "Étape 3: Enfourner pour 15 minutes.",
      "Étape 4: Cuire l'œuf dans une casserole d’eau bouillante salée pendant 6 minutes, refroidir et écaler.",
      "Étape 5: Dans un verre mesureur, mixer l'œuf cuit avec la moutarde, l’ail râpé, le parmesan, monter la sauce à l’huile de pépins de raisin. Saler et poivrer.",
      "Étape 6: Vérifier la cuisson des asperges, les disposer dans un plat et napper de sauce. Décorer avec des copeaux de parmesan et du cerfeuil.",
    ],
  },
  {
    id: 2,
    slug: "aubergines_farcies",
    name: "Aubergines farcies",
    category: "plat",
    description:
      "Demi-aubergines garnies de légumes ou de viande, relevées d'herbes fraîches et gratinées au four.",
    price: "bon marché",
    number_person: 1,
    timing_preparation: 15,
    cooking: 40,
    ingredients: [
      { slug: "aubergine", quantity_person: 0.5, unity: "pièce" },
      { slug: "oignon", quantity_person: 0.5, unity: "pièce" },
      { slug: "tomate", quantity_person: 0.25, unity: "pièce" },
      { slug: "gruyere_rape", quantity_person: 10, unity: "g" },
      { slug: "oeuf", quantity_person: 0.25, unity: "unité" },
      { slug: "chair_saucisse", quantity_person: 25, unity: "g" },
      {
        slug: "huile_olive",
        quantity_person: 1,
        unity: "cuillère à café",
      },
      { slug: "ail", quantity_person: 0.25, unity: "gousse" },
      {
        slug: "persil",
        quantity_person: 1,
        unity: "cuillère à café",
      },
      {
        slug: "basilic",
        quantity_person: 1,
        unity: "cuillère à café",
      },
      { slug: "sel", quantity_person: 1, unity: "pincée" },
      { slug: "poivre", quantity_person: 1, unity: "tour" },
    ],
    preparation: [
      "Étape 1: Couper l'aubergine en deux dans la longueur et inciser la chair en 'X'.",
      "Étape 2: Arroser d'huile d'olive et enfourner à 250°C pendant 30 minutes.",
      "Étape 3: Retirer la chair et la couper finement.",
      "Étape 4: Faire blanchir les oignons à feu doux 15 min, ajouter la chair à saucisse si désiré.",
      "Étape 5: Ajouter les tomates en dés et l'ail, cuire à feu très doux.",
      "Étape 6: Incorporer la chair d'aubergine, le persil, le basilic et l'œuf battu.",
      "Étape 7: Mélanger et remplir les demi-aubergines, saupoudrer de gruyère râpé.",
      "Étape 8: Remettre au four 5-10 minutes dans le four chaud.",
      "Étape 9: Laisser tiédir et servir chaud ou froid.",
    ],
  },
];

module.exports = { ingredients, recipes };
