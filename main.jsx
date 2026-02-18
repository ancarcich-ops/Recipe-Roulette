import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Heart, X, Wand2, Clock, Archive, ShoppingCart, Plus, LogOut, User, Camera, Edit2, Check } from 'lucide-react';

const supabase = createClient(
  'https://vftxreojulwfqzguylrk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdHhyZW9qdWx3ZnF6Z3V5bHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyOTIxOTUsImV4cCI6MjA4Njg2ODE5NX0.s-409NS9X6yvpCulKqM45tfl74EsVbuJSDYi9Ln4qCI'
);

const sampleRecipes = [
  // ── ORIGINALS ──
  { id: 1, name: "Mediterranean Quinoa Bowl", author: "You", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", prepTime: "20 min", cookTime: 15, servings: 4, ingredients: ["1 cup quinoa","2 cups water","2 cups cherry tomatoes","1 large cucumber, diced","1 cup feta cheese","1/2 cup kalamata olives","2 lemons (juice)","1/4 cup olive oil","Salt and pepper","Fresh parsley"], instructions: ["Rinse quinoa, combine with water and bring to boil.","Reduce heat, cover, simmer 15 minutes. Fluff and cool.","Prepare vegetables while quinoa cooks.","Combine all ingredients in a bowl.","Whisk lemon juice, olive oil, salt and pepper.","Pour dressing over and toss.","Garnish with parsley and serve."], tags: ["Healthy","Quick","Vegetarian","Lunch","Whole30"], timesMade: 5, isEasy: true },
  { id: 2, name: "Teriyaki Chicken Stir Fry", author: "You", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop", prepTime: "30 min", cookTime: 25, servings: 4, ingredients: ["1.5 lbs chicken breast","3 cups broccoli florets","2 bell peppers, sliced","1/4 cup soy sauce","3 tbsp honey","2 tbsp fresh ginger","3 cloves garlic","2 cups jasmine rice","2 tbsp vegetable oil","Sesame seeds"], instructions: ["Cook rice and set aside.","Mix soy sauce, honey, ginger and garlic for sauce.","Cook chicken in oil until golden, remove.","Stir-fry broccoli and peppers 4-5 minutes.","Return chicken, pour sauce over everything.","Stir until sauce thickens. Serve over rice."], tags: ["Asian","Protein","Dinner","KidFriendly","QuickWeeknight"], timesMade: 3, isEasy: false },
  { id: 3, name: "Creamy Tomato Pasta", author: "You", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", prepTime: "25 min", cookTime: 20, servings: 4, ingredients: ["1 lb penne pasta","2 lbs fresh tomatoes","1 cup heavy cream","4 cloves garlic","1/4 cup fresh basil","1/2 cup parmesan","3 tbsp olive oil","Salt and pepper"], instructions: ["Cook pasta, reserve 1 cup pasta water, drain.","Saute garlic in olive oil 1 minute.","Add tomatoes, simmer 10-12 minutes.","Stir in heavy cream.","Toss with pasta, add pasta water as needed.","Top with basil and parmesan."], tags: ["Comfort Food","Italian","Dinner","HouseFavorites"], timesMade: 0, isEasy: false },
  { id: 4, name: "Quick Avocado Toast", author: "You", image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop", prepTime: "10 min", cookTime: 5, servings: 2, ingredients: ["4 slices sourdough bread","2 ripe avocados","1 lemon (juice)","1/2 tsp salt","1/4 tsp black pepper","1 cup cherry tomatoes","Red pepper flakes"], instructions: ["Toast bread until golden.","Mash avocados with lemon juice, salt and pepper.","Spread avocado on toast.","Top with cherry tomatoes.","Sprinkle with red pepper flakes if desired."], tags: ["Quick","Breakfast","Healthy","Whole30"], timesMade: 8, isEasy: true },
  { id: 5, name: "Simple Greek Salad", author: "You", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 0, servings: 4, ingredients: ["2 large cucumbers","4 medium tomatoes","1 red onion","1 cup feta cheese","1/2 cup kalamata olives","1/4 cup olive oil","2 tbsp red wine vinegar","1 tsp oregano","Salt and pepper"], instructions: ["Wash and dry all vegetables.","Cut cucumbers and tomatoes into pieces.","Combine in bowl with onion.","Add feta and olives.","Whisk dressing and pour over. Toss."], tags: ["Quick","Healthy","Vegetarian","Lunch","Whole30"], timesMade: 0, isEasy: true },
  { id: 6, name: "Garlic Shrimp Pasta", author: "You", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop", prepTime: "25 min", cookTime: 20, servings: 4, ingredients: ["1 lb spaghetti","1.5 lbs large shrimp","6 cloves garlic","1/2 cup white wine","4 tbsp butter","1/4 cup fresh parsley","1/4 cup parmesan","2 tbsp olive oil","1 tsp red pepper flakes","Zest of 1 lemon"], instructions: ["Cook spaghetti, reserve pasta water.","Cook shrimp 2 min per side. Remove.","Cook garlic in butter 1 minute.","Add wine and red pepper flakes. Simmer 3-4 min.","Return shrimp and pasta, toss to coat.","Stir in parsley, lemon zest and parmesan."], tags: ["Seafood","Italian","Dinner","DateNight","HouseFavorites"], timesMade: 0, isEasy: false },

  // ── TRENDING 2025 - QUICK WEEKNIGHT / HOUSE FAVORITES ──
  { id: 7, name: "Marry Me Chicken Pasta", author: "You", image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=300&fit=crop", prepTime: "25 min", cookTime: 20, servings: 4, ingredients: ["1.5 lbs chicken breast, sliced thin","12 oz penne pasta","1 cup heavy cream","1/2 cup sun-dried tomatoes","4 cloves garlic, minced","1/2 cup parmesan, grated","1 tsp red pepper flakes","1 tsp Italian seasoning","2 tbsp olive oil","Fresh basil to garnish"], instructions: ["Season chicken with salt, pepper and Italian seasoning.","Cook chicken in olive oil 4-5 min per side until golden. Set aside.","In same pan, cook garlic 1 min.","Add cream, sun-dried tomatoes and red pepper flakes. Simmer 3 min.","Stir in parmesan until melted.","Add cooked pasta and sliced chicken, toss to coat.","Garnish with fresh basil and serve immediately."], tags: ["Dinner","Italian","QuickWeeknight","HouseFavorites"], timesMade: 0, isEasy: false },
  { id: 8, name: "Honey Garlic Chicken Rice Bowl", author: "You", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop", prepTime: "20 min", cookTime: 20, servings: 4, ingredients: ["1.5 lbs chicken thighs, boneless","3 tbsp honey","4 cloves garlic, minced","3 tbsp soy sauce","1 tbsp rice vinegar","2 cups jasmine rice, cooked","1 cup broccoli florets, steamed","2 green onions, sliced","1 tbsp sesame seeds","1 tbsp vegetable oil"], instructions: ["Mix honey, garlic, soy sauce and rice vinegar for sauce.","Cook chicken thighs in oil 5-6 min per side until cooked through.","Pour sauce over chicken and simmer 2-3 min, coating well.","Slice chicken and serve over rice with broccoli.","Top with green onions and sesame seeds."], tags: ["Asian","Dinner","QuickWeeknight","KidFriendly","HouseFavorites"], timesMade: 0, isEasy: true },
  { id: 9, name: "One Pan Lemon Herb Salmon", author: "You", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", prepTime: "10 min", cookTime: 15, servings: 4, ingredients: ["4 salmon fillets","1 lemon, sliced","4 cloves garlic, minced","2 tbsp olive oil","1 tsp dried dill","1 tsp smoked paprika","1 lb asparagus, trimmed","Salt and pepper","Fresh parsley"], instructions: ["Preheat oven to 400F. Line baking sheet with parchment.","Place salmon and asparagus on sheet pan.","Mix olive oil, garlic, dill and paprika. Brush over salmon.","Top with lemon slices. Season asparagus with oil, salt and pepper.","Bake 12-15 min until salmon flakes easily.","Garnish with fresh parsley and serve."], tags: ["Seafood","Healthy","Whole30","QuickWeeknight","DateNight"], timesMade: 0, isEasy: true },
  { id: 10, name: "Ground Turkey Taco Bowls", author: "You", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 15, servings: 4, ingredients: ["1.5 lbs ground turkey","2 tbsp taco seasoning","2 cups cooked brown rice","1 can black beans, drained","1 cup corn","1 cup cherry tomatoes, halved","1 avocado, sliced","1/4 cup fresh cilantro","Lime wedges","Sour cream optional"], instructions: ["Brown turkey in skillet over medium-high heat, breaking up as it cooks.","Add taco seasoning and 1/4 cup water. Stir and simmer 3 min.","Warm beans and corn in a small saucepan.","Build bowls: rice, turkey, beans, corn, tomatoes.","Top with avocado, cilantro and a squeeze of lime."], tags: ["Mexican","Healthy","Dinner","KidFriendly","QuickWeeknight","Whole30"], timesMade: 0, isEasy: true },

  // ── CROCK POT FAVORITES ──
  { id: 11, name: "Crockpot Salsa Verde Chicken", author: "You", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop", prepTime: "10 min", cookTime: 240, servings: 6, ingredients: ["2 lbs chicken breast","1 jar (16 oz) salsa verde","1 can diced green chiles","1 tsp cumin","1 tsp garlic powder","1 tsp onion powder","Salt and pepper","Tortillas or rice to serve","Sour cream and cilantro to garnish"], instructions: ["Place chicken in crockpot. Season with cumin, garlic powder, onion powder, salt and pepper.","Pour salsa verde and green chiles over chicken.","Cook on low 6-7 hours or high 3-4 hours.","Shred chicken with two forks directly in the pot.","Stir chicken back into the juices.","Serve in tacos, bowls or over rice. Top with sour cream and cilantro."], tags: ["Mexican","CrockPot","Dinner","KidFriendly","HouseFavorites"], timesMade: 0, isEasy: true },
  { id: 12, name: "Slow Cooker Tuscan White Bean Soup", author: "You", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 360, servings: 6, ingredients: ["2 cans white cannellini beans, drained","1 lb Italian sausage, sliced","1 can diced tomatoes","3 cups chicken broth","3 cups kale, chopped","4 cloves garlic, minced","1 onion, diced","1 tsp Italian seasoning","1/2 tsp red pepper flakes","Parmesan rind (optional)","Salt and pepper"], instructions: ["Add all ingredients except kale to crockpot.","Stir to combine. Drop in parmesan rind if using.","Cook on low 7-8 hours or high 4 hours.","In last 30 minutes, stir in kale and cook until wilted.","Remove parmesan rind. Taste and adjust seasoning.","Serve with crusty bread and extra parmesan."], tags: ["Soup","CrockPot","Dinner","HouseFavorites"], timesMade: 0, isEasy: true },
  { id: 13, name: "Crockpot Chicken Tikka Masala", author: "You", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 300, servings: 5, ingredients: ["2 lbs chicken thighs, boneless, cubed","1 can (28oz) crushed tomatoes","1 can coconut milk","1 onion, diced","4 cloves garlic, minced","2 tbsp tikka masala spice blend","1 tsp garam masala","1 tsp ginger, grated","2 tbsp olive oil","Basmati rice and naan to serve","Fresh cilantro"], instructions: ["Saute onion and garlic in oil until soft. Transfer to crockpot.","Add chicken, tomatoes, coconut milk and all spices.","Stir to combine.","Cook on low 6-7 hours or high 3-4 hours.","Shred chicken slightly or leave in chunks.","Serve over basmati rice with naan and fresh cilantro."], tags: ["Indian","CrockPot","Dinner","HouseFavorites"], timesMade: 0, isEasy: true },
  { id: 14, name: "Slow Cooker Beef Chili", author: "You", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop", prepTime: "20 min", cookTime: 480, servings: 8, ingredients: ["2 lbs ground beef","2 cans kidney beans, drained","1 can diced tomatoes","1 can tomato sauce","1 onion, diced","3 cloves garlic, minced","2 tbsp chili powder","1 tsp cumin","1 tsp smoked paprika","1/2 tsp cayenne (optional)","Salt and pepper","Toppings: cheese, sour cream, green onions"], instructions: ["Brown beef in skillet. Drain fat.","Add beef and all remaining ingredients to crockpot.","Stir to combine.","Cook on low 8 hours or high 4-5 hours.","Taste and adjust seasoning.","Serve with your favorite toppings."], tags: ["CrockPot","Dinner","KidFriendly","HouseFavorites"], timesMade: 0, isEasy: true },

  // ── KID FRIENDLY ──
  { id: 15, name: "Sheet Pan Mac and Cheese Bake", author: "You", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop", prepTime: "10 min", cookTime: 25, servings: 6, ingredients: ["1 lb elbow macaroni, cooked","2 cups sharp cheddar, shredded","1 cup gruyere, shredded","2 cups milk","3 tbsp butter","3 tbsp flour","1/2 tsp mustard powder","Salt and pepper","1/2 cup panko breadcrumbs"], instructions: ["Make roux: melt butter, whisk in flour, cook 1 min.","Slowly whisk in milk. Cook until thickened, 5 min.","Stir in cheese until melted. Season with mustard powder, salt and pepper.","Toss with cooked pasta. Pour into baking dish.","Top with breadcrumbs and extra cheese.","Bake at 375F for 20-25 min until golden and bubbly."], tags: ["Dinner","KidFriendly","Comfort Food","HouseFavorites"], timesMade: 0, isEasy: false },
  { id: 16, name: "Hidden Veggie Turkey Meatballs", author: "You", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop", prepTime: "20 min", cookTime: 20, servings: 5, ingredients: ["1.5 lbs ground turkey","1/2 cup zucchini, grated and squeezed dry","1/2 cup carrot, finely grated","1/4 cup parmesan","1 egg","3 cloves garlic, minced","1/2 cup breadcrumbs","1 tsp Italian seasoning","Salt and pepper","Marinara sauce to serve"], instructions: ["Preheat oven to 400F. Line baking sheet with parchment.","Combine all ingredients in a bowl. Mix gently until just combined.","Roll into 1.5 inch balls and place on baking sheet.","Bake 18-20 min until cooked through.","Warm marinara sauce and serve with pasta or as an appetizer.","Kids won't even notice the vegetables!"], tags: ["Dinner","KidFriendly","Healthy","Protein"], timesMade: 0, isEasy: false },

  // ── WHOLE 30 ──
  { id: 17, name: "Whole30 Sheet Pan Chicken and Veggies", author: "You", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 35, servings: 4, ingredients: ["4 chicken thighs, bone-in","2 bell peppers, sliced","1 zucchini, sliced","1 red onion, wedges","1 cup cherry tomatoes","3 tbsp olive oil","4 cloves garlic, minced","1 tsp smoked paprika","1 tsp Italian seasoning","Salt and pepper","Fresh lemon wedges"], instructions: ["Preheat oven to 425F.","Toss vegetables with 2 tbsp olive oil, salt and pepper. Spread on sheet pan.","Rub chicken with remaining oil, garlic, paprika, Italian seasoning, salt and pepper.","Nestle chicken among vegetables on pan.","Roast 30-35 min until chicken is cooked through and vegetables are caramelized.","Squeeze fresh lemon over everything before serving."], tags: ["Whole30","Healthy","Dinner","QuickWeeknight"], timesMade: 0, isEasy: true },
  { id: 18, name: "Blackened Salmon with Mango Salsa", author: "You", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 12, servings: 4, ingredients: ["4 salmon fillets","1 tbsp blackening seasoning","2 tbsp olive oil","1 ripe mango, diced","1/4 red onion, finely diced","1 jalapeno, seeded and minced","1/4 cup fresh cilantro","2 tbsp lime juice","Salt to taste"], instructions: ["Make mango salsa: combine mango, red onion, jalapeno, cilantro and lime juice. Season with salt.","Pat salmon dry. Coat all over with blackening seasoning.","Heat oil in cast iron skillet over high heat until very hot.","Cook salmon 4-5 min per side until blackened and cooked through.","Serve salmon topped generously with mango salsa."], tags: ["Whole30","Seafood","Healthy","DateNight","QuickWeeknight"], timesMade: 0, isEasy: true },

  // ── DATE NIGHT ──
  { id: 19, name: "Chicken in Creamy Mushroom Sauce", author: "You", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 25, servings: 2, ingredients: ["2 large chicken breasts","8 oz cremini mushrooms, sliced","3 cloves garlic, minced","1/2 cup white wine","1 cup heavy cream","2 tbsp butter","1 tbsp fresh thyme","1 tbsp Dijon mustard","Salt and pepper","Fresh parsley"], instructions: ["Season chicken generously with salt and pepper.","Sear chicken in butter 5-6 min per side until golden. Remove and set aside.","In same pan, cook mushrooms until browned, 5 min.","Add garlic and thyme, cook 1 min.","Deglaze with white wine. Simmer 2 min.","Stir in cream and Dijon. Simmer until thickened.","Return chicken to pan. Simmer 5 min until cooked through.","Garnish with fresh parsley and serve."], tags: ["Dinner","DateNight","HouseFavorites"], timesMade: 0, isEasy: false },
  { id: 20, name: "Seared Scallops with Lemon Butter", author: "You", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop", prepTime: "10 min", cookTime: 10, servings: 2, ingredients: ["1 lb large sea scallops","3 tbsp butter","2 cloves garlic, minced","1 lemon (juice and zest)","1 tbsp fresh parsley","Salt and pepper","1 tbsp olive oil","Cauliflower puree or risotto to serve"], instructions: ["Pat scallops completely dry with paper towels. Season generously with salt and pepper.","Heat oil in stainless or cast iron skillet over very high heat until smoking.","Add scallops without crowding. Do NOT move them. Sear 90 seconds.","Flip scallops. Add butter and garlic. Baste with butter 60-90 seconds.","Remove scallops. Add lemon juice to pan and swirl.","Plate scallops, drizzle with lemon butter, garnish with parsley and lemon zest."], tags: ["Seafood","DateNight","Healthy","Whole30"], timesMade: 0, isEasy: false }
];

const communityRecipes = [
  { id: 101, name: "Spicy Thai Basil Chicken", author: "Sarah Chen", avatar: "SC", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop", prepTime: "25 min", cookTime: 25, likes: 24, onMenu: 8, saves: 15, isEasy: false, ingredients: ["1.5 lbs chicken","2 cups Thai basil","4 chilies","3 tbsp fish sauce","4 cloves garlic","2 tbsp soy sauce","1 tbsp oyster sauce","2 tbsp oil"], instructions: ["Heat oil in wok over high heat.","Add garlic and chilies, stir-fry 1 minute.","Add chicken, cook until done.","Add sauces, stir to combine.","Add basil and toss until wilted.","Serve over rice."], tags: ["Asian","Dinner"], servings: 4 },
  { id: 102, name: "Honey Garlic Salmon", author: "Marcus Johnson", avatar: "MJ", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop", prepTime: "20 min", cookTime: 15, likes: 31, onMenu: 12, saves: 22, isEasy: true, ingredients: ["4 salmon fillets","3 tbsp honey","4 cloves garlic","2 tbsp soy sauce","1 lemon","2 tbsp butter","Salt and pepper"], instructions: ["Season salmon with salt and pepper.","Mix honey, garlic and soy sauce.","Sear salmon 4 min per side.","Pour sauce over salmon.","Cook 2 more minutes until glazed.","Serve with lemon wedges."], tags: ["Seafood","Quick","Dinner"], servings: 4 },
  { id: 103, name: "Vegetable Buddha Bowl", author: "Elena Rodriguez", avatar: "ER", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", prepTime: "30 min", cookTime: 25, likes: 19, onMenu: 6, saves: 12, isEasy: false, ingredients: ["1 can chickpeas","1 large sweet potato","1 cup quinoa","2 cups kale","3 tbsp tahini","1 lemon","2 tbsp olive oil","Salt and pepper"], instructions: ["Roast chickpeas and sweet potato at 400F for 25 min.","Cook quinoa.","Massage kale with olive oil.","Make dressing: tahini, lemon, water.","Assemble bowls.","Drizzle with tahini dressing."], tags: ["Vegetarian","Healthy","Lunch"], servings: 4 },
  { id: 104, name: "Korean Beef Tacos", author: "James Kim", avatar: "JK", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", prepTime: "35 min", cookTime: 30, likes: 42, onMenu: 15, saves: 28, isEasy: false, ingredients: ["1 lb ground beef","2 tbsp gochujang","8 small tortillas","1 cup kimchi","4 green onions","2 tbsp soy sauce","1 tbsp sesame oil","1 tbsp sugar"], instructions: ["Brown beef in pan.","Add gochujang, soy sauce, sesame oil and sugar.","Simmer 5 minutes.","Warm tortillas.","Fill with beef mixture.","Top with kimchi and green onions."], tags: ["Korean","Dinner"], servings: 4 },
  { id: 105, name: "Quick Egg Fried Rice", author: "Sarah Chen", avatar: "SC", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop", prepTime: "15 min", cookTime: 10, likes: 28, onMenu: 10, saves: 18, isEasy: true, ingredients: ["3 cups cooked rice","3 eggs","3 tbsp soy sauce","3 green onions","2 tbsp sesame oil","2 tbsp vegetable oil","Salt and pepper"], instructions: ["Heat oil in wok over high heat.","Scramble eggs, push to side.","Add rice, stir-fry 3-4 minutes.","Add soy sauce and sesame oil.","Toss with eggs and green onions.","Season and serve."], tags: ["Asian","Quick","Lunch"], servings: 2 }
];


const feedPosts = [
  {
    id: 'f1', type: 'hero', category: 'seasonal',
    tag: '🌸 Spring Picks',
    title: 'Fresh Spring Recipes to Brighten Your Week',
    body: 'As the weather warms up, it\'s time to swap heavy stews for vibrant salads, light pasta dishes, and fresh herb-forward cooking. Here are our top picks for the season.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop',
    recipe: { id: 201, name: 'Spring Pea and Mint Risotto', prepTime: '35 min', cookTime: 30, servings: 4, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop', ingredients: ['2 cups arborio rice','4 cups vegetable broth','1 cup fresh peas','3 tbsp fresh mint','1/2 cup parmesan','1 onion, diced','2 tbsp butter','1/2 cup white wine','Salt and pepper'], instructions: ['Heat broth in a separate pot.','Saute onion in butter until soft.','Add rice, toast 2 minutes.','Add wine and stir until absorbed.','Add broth ladle by ladle, stirring.','Stir in peas in the last 5 minutes.','Finish with parmesan and mint.'], tags: ['Vegetarian','Italian','Dinner'], timesMade: 0, author: 'Recipe Roulette', isEasy: false }
  },
  {
    id: 'f2', type: 'tip', category: 'tip',
    tag: '💡 Pro Tip',
    title: 'Salt Your Pasta Water Like the Sea',
    body: 'The most common pasta mistake? Under-salted water. Your pasta water should taste genuinely salty — about 1 tablespoon of salt per 4 cups of water. The pasta absorbs it as it cooks, building flavor from the inside out. No amount of sauce can fix bland pasta.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop',
    recipe: null
  },
  {
    id: 'f3', type: 'small', category: 'quick',
    tag: '⚡ 15-Min Meal',
    title: 'Garlic Butter Shrimp Tacos',
    body: 'Weeknight hero right here. Juicy shrimp tossed in garlic butter, hit with lime, stuffed into warm tortillas with a quick slaw. Done in 15 minutes flat.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=450&fit=crop',
    recipe: { id: 202, name: 'Garlic Butter Shrimp Tacos', prepTime: '15 min', cookTime: 10, servings: 2, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', ingredients: ['1 lb shrimp, peeled','8 small tortillas','3 tbsp butter','4 cloves garlic','1 lime','1/2 cup shredded cabbage','2 tbsp sour cream','Fresh cilantro','Salt and pepper'], instructions: ['Melt butter in pan over high heat.','Add garlic, cook 30 seconds.','Add shrimp, cook 2 min per side.','Squeeze lime over shrimp.','Warm tortillas.','Fill with shrimp, cabbage and sour cream.','Top with cilantro and serve.'], tags: ['Quick','Seafood','Dinner'], timesMade: 0, author: 'Recipe Roulette', isEasy: true }
  },
  {
    id: 'f4', type: 'small', category: 'nutrition',
    tag: '🥗 Nutrition',
    title: 'Why You Should Eat the Rainbow',
    body: 'Different colored fruits and vegetables contain different phytonutrients. Red for lycopene, orange for beta-carotene, green for folate, purple for anthocyanins. Aim for at least 3 colors on your plate every meal.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=450&fit=crop',
    recipe: null
  },
  {
    id: 'f5', type: 'hero', category: 'community',
    tag: '⭐ Community Favourite',
    title: 'The Recipe Everyone is Adding to Their Plan',
    body: 'Korean Beef Tacos have taken over the community this week — 42 likes and counting. James Kim\'s recipe is bold, fast, and endlessly satisfying. If you haven\'t tried it yet, now\'s the time.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=450&fit=crop',
    recipe: { id: 104, name: 'Korean Beef Tacos', prepTime: '35 min', cookTime: 30, servings: 4, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', ingredients: ['1 lb ground beef','2 tbsp gochujang','8 small tortillas','1 cup kimchi','4 green onions','2 tbsp soy sauce','1 tbsp sesame oil','1 tbsp sugar'], instructions: ['Brown beef in pan.','Add gochujang, soy sauce, sesame oil and sugar.','Simmer 5 minutes.','Warm tortillas.','Fill with beef mixture.','Top with kimchi and green onions.'], tags: ['Korean','Dinner'], timesMade: 0, author: 'James Kim', isEasy: false }
  },
  {
    id: 'f6', type: 'tip', category: 'tip',
    tag: '🔪 Knife Skills',
    title: 'The Claw Grip Saves Fingers',
    body: 'Curl your fingertips inward when chopping so your knuckles guide the blade. It feels awkward at first but becomes second nature fast — and it\'s the single most effective way to avoid cutting yourself. Professional chefs never chop any other way.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop',
    recipe: null
  },
  {
    id: 'f7', type: 'small', category: 'quick',
    tag: '🍳 5-Min Breakfast',
    title: 'High-Protein Scrambled Eggs',
    body: 'Low heat, constant motion, pull off early. The secret to restaurant-quality scrambled eggs is patience and removing from heat while still slightly underdone. Finish with butter and chives.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&h=450&fit=crop',
    recipe: { id: 203, name: 'Perfect Scrambled Eggs', prepTime: '5 min', cookTime: 5, servings: 1, image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop', ingredients: ['3 large eggs','1 tbsp butter','2 tbsp milk or cream','Salt and pepper','Fresh chives'], instructions: ['Whisk eggs with milk, salt and pepper.','Melt butter in pan over low heat.','Add eggs and stir constantly with spatula.','Remove from heat when just slightly underdone.','Finish with extra butter and chives.'], tags: ['Breakfast','Quick','Protein'], timesMade: 0, author: 'Recipe Roulette', isEasy: true }
  },
  {
    id: 'f8', type: 'small', category: 'nutrition',
    tag: '💪 Meal Prep',
    title: 'Batch Cook These 3 Things Every Sunday',
    body: 'Cook a big batch of grains (quinoa or rice), roast a sheet pan of vegetables, and prep a versatile protein (chicken or chickpeas). Mix and match all week into bowls, wraps and salads without cooking from scratch every night.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=450&fit=crop',
    recipe: null
  },
  {
    id: 'f9', type: 'hero', category: 'seasonal',
    tag: '🌿 Farm to Table',
    title: 'Cooking with What\'s in Season Right Now',
    body: 'February is peak season for citrus, root vegetables, and hearty greens. Blood oranges, turnips, kale, and leeks are at their best and cheapest. Building meals around seasonal produce means better flavor and less waste.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=450&fit=crop',
    recipe: { id: 204, name: 'Roasted Root Vegetable Bowl', prepTime: '15 min', cookTime: 40, servings: 4, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop', ingredients: ['2 large turnips, cubed','3 carrots, chopped','1 large beet, cubed','2 tbsp olive oil','1 tsp cumin','1 tsp smoked paprika','Salt and pepper','Fresh parsley','Tahini dressing'], instructions: ['Preheat oven to 425F.','Toss vegetables with olive oil and spices.','Spread on a baking sheet.','Roast 35-40 minutes, turning halfway.','Serve over grains with tahini dressing.','Garnish with fresh parsley.'], tags: ['Vegetarian','Healthy','Dinner'], timesMade: 0, author: 'Recipe Roulette', isEasy: false }
  },
  {
    id: 'f10', type: 'tip', category: 'tip',
    tag: '🧄 Flavour Basics',
    title: 'Build Flavour in Layers, Not All at Once',
    body: 'Add aromatics (garlic, onion, ginger) first in fat. Then add dry spices and toast briefly. Then add your protein. Then liquid. Each layer builds on the last. Adding everything at once is the most common reason home cooking tastes flat.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=450&fit=crop',
    recipe: null
  }
];

const emptyMealPlan = {
  0:{breakfast:null,lunch:null,dinner:null},
  1:{breakfast:null,lunch:null,dinner:null},
  2:{breakfast:null,lunch:null,dinner:null},
  3:{breakfast:null,lunch:null,dinner:null},
  4:{breakfast:null,lunch:null,dinner:null},
  5:{breakfast:null,lunch:null,dinner:null},
  6:{breakfast:null,lunch:null,dinner:null}
};

const AuthScreen = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage('Account created! Check your email to confirm, then log in.');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQABgADASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAgBAgYHCQMFBP/EAGYQAAIBAwIEAwQGBQUKCAoDEQABAgMEBQYRBxIhMQgTQSJRYXEJFDKBkaEVI0JSsTNicoKSFiRDU5Oio8HR4Rclc4Oys7TwNDdUY5TCw8TT8SYnREZWdHakNmTkGDVVZnWEhaXS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AIZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=" alt="Logo" style={{width:'220px',height:'220px',objectFit:'contain',marginBottom:'8px'}} />
          <p style={{margin:0,color:'#666',fontSize:'15px'}}>Plan together, eat better</p>
        </div>
        <div style={{background:'#1a1a1a',borderRadius:'12px',padding:'32px',border:'1px solid #262626'}}>
          <div style={{display:'flex',gap:'8px',marginBottom:'24px',background:'#0a0a0a',borderRadius:'8px',padding:'4px'}}>
            {['login','signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setMessage(''); }}
                style={{flex:1,padding:'10px',background:mode===m?'#ffffff':'transparent',color:mode===m?'#000000':'#999',border:'none',borderRadius:'6px',fontWeight:600,fontSize:'14px',cursor:'pointer'}}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>
          <form onSubmit={handle}>
            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',marginBottom:'6px',fontWeight:600,color:'#ffffff',fontSize:'14px'}}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                style={{width:'100%',padding:'11px 14px',border:'1px solid #262626',borderRadius:'8px',fontSize:'14px',background:'#0a0a0a',color:'#ffffff',outline:'none',boxSizing:'border-box'}} />
            </div>
            <div style={{marginBottom:'24px'}}>
              <label style={{display:'block',marginBottom:'6px',fontWeight:600,color:'#ffffff',fontSize:'14px'}}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 6 characters" minLength={6}
                style={{width:'100%',padding:'11px 14px',border:'1px solid #262626',borderRadius:'8px',fontSize:'14px',background:'#0a0a0a',color:'#ffffff',outline:'none',boxSizing:'border-box'}} />
            </div>
            {error && <div style={{background:'#2d1515',border:'1px solid #ff4444',borderRadius:'8px',padding:'12px',marginBottom:'16px',color:'#ff6b6b',fontSize:'13px'}}>{error}</div>}
            {message && <div style={{background:'#152d1a',border:'1px solid #51cf66',borderRadius:'8px',padding:'12px',marginBottom:'16px',color:'#51cf66',fontSize:'13px'}}>{message}</div>}
            <button type="submit" disabled={loading}
              style={{width:'100%',padding:'13px',background:'#ffffff',color:'#000000',border:'none',borderRadius:'8px',fontSize:'15px',fontWeight:700,cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1}}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


const MealPrepApp = () => {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [profile, setProfile] = useState({
    displayName: '',
    avatarUrl: '',
    avatarPreview: '',
    dietaryPrefs: [],
    householdSize: 2
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [folders, setFolders] = useState([
    {id:'f1', name:'House Favorites', emoji:'🏠', recipes:[3,6,8,11,12,13,14,15,19]},
    {id:'f2', name:'Crock Pot Favorites', emoji:'🍲', recipes:[11,12,13,14]},
    {id:'f3', name:'Kid Friendly', emoji:'👶', recipes:[2,8,10,11,14,15,16]},
    {id:'f4', name:'Whole 30 Approved', emoji:'💪', recipes:[1,4,5,9,10,17,18,20]},
    {id:'f5', name:'Quick Weeknight', emoji:'⚡', recipes:[2,4,7,8,9,10,17,18]},
    {id:'f6', name:'Date Night', emoji:'🕯️', recipes:[6,9,18,19,20]}
  ]);
  const [activeFolder, setActiveFolder] = useState(null); // null = show all folders
  const [showFolderModal, setShowFolderModal] = useState(false); // create new folder
  const [showSaveToFolderModal, setShowSaveToFolderModal] = useState(null); // recipe to save
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderEmoji, setNewFolderEmoji] = useState('📁');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAutoFillModal, setShowAutoFillModal] = useState(false);
  const [showRecipeSelector, setShowRecipeSelector] = useState(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [showAddToCalendar, setShowAddToCalendar] = useState(null);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState(new Set());
  const [userRatings, setUserRatings] = useState({}); // {recipeId: {rating: 1-5, ratedAt: timestamp}}
  const [communityRatings, setCommunityRatings] = useState({
    // Sample community ratings for community recipes
    101: {avg: 4.6, count: 24},
    102: {avg: 4.8, count: 31}, 
    103: {avg: 4.3, count: 19},
    104: {avg: 4.9, count: 42},
    105: {avg: 4.5, count: 28},
    // Sample ratings for some user recipes too
    7: {avg: 4.7, count: 15},
    8: {avg: 4.4, count: 23},
    11: {avg: 4.6, count: 18},
    19: {avg: 4.9, count: 31}
  }); // {recipeId: {avg: 4.5, count: 12}}
  const [showRatingModal, setShowRatingModal] = useState(null); // recipe to rate
  const [recipeImagePreview, setRecipeImagePreview] = useState(null);
  const [draggedMeal, setDraggedMeal] = useState(null);
  const [recipeFilters, setRecipeFilters] = useState({cookTime:'all',mealType:'all',tried:'all',author:'all'});
  const [autoFillSettings, setAutoFillSettings] = useState({easyMeals:3,communityMeals:2,untriedRecipes:2});
  const [mealTypeSettings, setMealTypeSettings] = useState({
    0:{breakfast:true,lunch:false,dinner:true},
    1:{breakfast:true,lunch:true,dinner:true},
    2:{breakfast:true,lunch:true,dinner:true},
    3:{breakfast:true,lunch:true,dinner:true},
    4:{breakfast:true,lunch:true,dinner:true},
    5:{breakfast:true,lunch:true,dinner:true},
    6:{breakfast:true,lunch:false,dinner:true}
  });
  const [disabledSlots, setDisabledSlots] = useState({});
  const [mealPlan, setMealPlan] = useState(emptyMealPlan);

  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mealTypes = ['breakfast','lunch','dinner'];

  // ── Star Rating Component ──
  const StarRating = ({ rating, size = 16, interactive = false, onRate = null, color = '#fbbf24' }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const stars = [1,2,3,4,5];
    return (
      <div style={{display:'flex',gap:'2px',alignItems:'center'}} onMouseLeave={() => setHoverRating(0)}>
        {stars.map(star => {
          const filled = interactive ? (hoverRating >= star || (!hoverRating && rating >= star)) : rating >= star;
          return (
            <span key={star}
              onClick={() => interactive && onRate && onRate(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              style={{fontSize:`${size}px`,cursor:interactive?'pointer':'default',color:filled?color:'#333',transition:'color 0.1s',userSelect:'none'}}>
              ★
            </span>
          );
        })}
      </div>
    );
  };

  // ── Rating Display (avg + count) ──
  const RatingDisplay = ({ recipeId, compact = false }) => {
    const communityRating = communityRatings[recipeId];
    const userRating = userRatings[recipeId];
    if (!communityRating && !userRating) return null;
    return (
      <div style={{display:'flex',alignItems:'center',gap:'4px',fontSize:compact?'11px':'12px'}}>
        <StarRating rating={communityRating?.avg || userRating?.rating || 0} size={compact?12:14} />
        {communityRating && (
          <span style={{color:'#999',fontWeight:600}}>
            {communityRating.avg.toFixed(1)} ({communityRating.count})
          </span>
        )}
      </div>
    );
  };



  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) loadUserData(session.user.id);
  }, [session]);

  const loadUserData = async (userId) => {
    const { data: meals } = await supabase.from('meal_plans').select('*').eq('user_id', userId);
    if (meals && meals.length > 0) {
      const plan = JSON.parse(JSON.stringify(emptyMealPlan));
      meals.forEach(m => { if (plan[m.day_index]) plan[m.day_index][m.meal_type] = m.recipe; });
      setMealPlan(plan);
    }
    const { data: recipes } = await supabase.from('user_recipes').select('*').eq('user_id', userId);
    if (recipes) setUserRecipes(recipes.map(r => r.recipe));
    const { data: saved } = await supabase.from('saved_recipes').select('recipe_id').eq('user_id', userId);
    if (saved) setSavedRecipes(new Set(saved.map(r => r.recipe_id)));
    // Load profile
    const { data: prof } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (prof?.raw_user_meta_data || prof) {
      setProfile({
        displayName: prof.display_name || '',
        avatarUrl: prof.avatar_url || '',
        avatarPreview: prof.avatar_url || '',
        dietaryPrefs: prof.dietary_prefs || [],
        householdSize: prof.household_size || 2
      });
    }
    // Load user ratings
    const { data: ratings } = await supabase.from('recipe_ratings').select('*').eq('user_id', userId);
    if (ratings) {
      const ratingsMap = {};
      ratings.forEach(r => { ratingsMap[r.recipe_id] = {rating: r.rating, ratedAt: r.created_at}; });
      setUserRatings(ratingsMap);
    }
    // Load community ratings (average + count per recipe)
    const { data: communityRatings } = await supabase.from('recipe_ratings').select('recipe_id, rating');
    if (communityRatings) {
      const ratingsMap = {};
      communityRatings.forEach(r => {
        if (!ratingsMap[r.recipe_id]) ratingsMap[r.recipe_id] = {total: 0, count: 0};
        ratingsMap[r.recipe_id].total += r.rating;
        ratingsMap[r.recipe_id].count += 1;
      });
      const avgRatings = {};
      Object.keys(ratingsMap).forEach(rid => {
        avgRatings[rid] = {
          avg: ratingsMap[rid].total / ratingsMap[rid].count,
          count: ratingsMap[rid].count
        };
      });
      setCommunityRatings(avgRatings);
    }
  };

  const saveRating = async (recipeId, rating) => {
    if (!session?.user) return;
    const userId = session.user.id;
    await supabase.from('recipe_ratings').upsert({
      user_id: userId,
      recipe_id: recipeId,
      rating,
      created_at: new Date().toISOString()
    }, {onConflict: 'user_id,recipe_id'});
    setUserRatings(prev => ({...prev, [recipeId]: {rating, ratedAt: new Date().toISOString()}}));
    // Reload community ratings after user rates
    const { data: communityRatings } = await supabase.from('recipe_ratings').select('recipe_id, rating');
    if (communityRatings) {
      const ratingsMap = {};
      communityRatings.forEach(r => {
        if (!ratingsMap[r.recipe_id]) ratingsMap[r.recipe_id] = {total: 0, count: 0};
        ratingsMap[r.recipe_id].total += r.rating;
        ratingsMap[r.recipe_id].count += 1;
      });
      const avgRatings = {};
      Object.keys(ratingsMap).forEach(rid => {
        avgRatings[rid] = {
          avg: ratingsMap[rid].total / ratingsMap[rid].count,
          count: ratingsMap[rid].count
        };
      });
      setCommunityRatings(avgRatings);
    }
    setShowRatingModal(null);
  };

  const saveProfile = async () => {
    if (!session?.user) return;
    setProfileSaving(true);
    const userId = session.user.id;
    await supabase.from('profiles').upsert({
      id: userId,
      display_name: profile.displayName,
      avatar_url: profile.avatarPreview,
      dietary_prefs: profile.dietaryPrefs,
      household_size: profile.householdSize,
      updated_at: new Date().toISOString()
    });
    setProfile(p => ({ ...p, avatarUrl: p.avatarPreview }));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const saveMealPlan = async (newPlan) => {
    if (!session?.user) return;
    setSaving(true);
    const userId = session.user.id;
    await supabase.from('meal_plans').delete().eq('user_id', userId);
    const rows = [];
    for (let d = 0; d < 7; d++) {
      for (const mt of mealTypes) {
        if (newPlan[d][mt]) rows.push({user_id:userId,day_index:d,meal_type:mt,recipe:newPlan[d][mt]});
      }
    }
    if (rows.length > 0) await supabase.from('meal_plans').insert(rows);
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMealPlan(emptyMealPlan);
    setUserRecipes([]);
    setSavedRecipes(new Set());
  };

  const removeMealFromPlan = (dayIndex, mealType) => {
    const newPlan = {...mealPlan,[dayIndex]:{...mealPlan[dayIndex],[mealType]:null}};
    setMealPlan(newPlan);
    saveMealPlan(newPlan);
  };

  const addMealToPlan = (dayIndex, mealType, recipe) => {
    const newPlan = {...mealPlan,[dayIndex]:{...mealPlan[dayIndex],[mealType]:recipe}};
    setMealPlan(newPlan);
    setShowRecipeSelector(null);
    saveMealPlan(newPlan);
  };

  const clearAllMeals = () => { setMealPlan(emptyMealPlan); saveMealPlan(emptyMealPlan); };

  const isSlotDisabled = (d, mt) => disabledSlots[`${d}-${mt}`] || false;

  const toggleSlotDisabled = (d, mt) => {
    const key = `${d}-${mt}`;
    if (!disabledSlots[key]) removeMealFromPlan(d, mt);
    setDisabledSlots(prev => ({...prev,[key]:!prev[key]}));
  };

  const handleDragStart = (d, mt, recipe) => setDraggedMeal({d, mt, recipe});
  const handleDragOver = e => e.preventDefault();
  const handleDrop = (td, tmt) => {
    if (!draggedMeal || isSlotDisabled(td, tmt)) return;
    const newPlan = JSON.parse(JSON.stringify(mealPlan));
    newPlan[draggedMeal.d][draggedMeal.mt] = null;
    newPlan[td][tmt] = draggedMeal.recipe;
    setMealPlan(newPlan);
    saveMealPlan(newPlan);
    setDraggedMeal(null);
  };

  const saveCommunityRecipe = async (recipe) => {
    if (!session?.user || savedRecipes.has(recipe.id)) return;
    const newRecipe = {...recipe, timesMade:0};
    if (!userRecipes.find(r => r.id === recipe.id)) {
      setUserRecipes(prev => [...prev, newRecipe]);
      await supabase.from('user_recipes').insert({user_id:session.user.id, recipe:newRecipe});
    }
    setSavedRecipes(prev => new Set([...prev, recipe.id]));
    await supabase.from('saved_recipes').insert({user_id:session.user.id, recipe_id:recipe.id});
  };

  const autoFillCalendar = () => {
    const newPlan = JSON.parse(JSON.stringify(mealPlan));
    const all = [...sampleRecipes, ...communityRecipes, ...userRecipes];
    const empty = [];
    for (let d = 0; d < 7; d++) for (const mt of mealTypes)
      if (mealTypeSettings[d][mt] && !newPlan[d][mt] && !isSlotDisabled(d, mt)) empty.push({d, mt});
    const slots = empty.sort(() => Math.random() - 0.5);
    let i = 0;
    const easy = all.filter(r => r.cookTime < 20).sort(() => Math.random() - 0.5);
    for (let j = 0; j < autoFillSettings.easyMeals && i < slots.length; j++, i++) newPlan[slots[i].d][slots[i].mt] = easy[j % easy.length];
    const popular = [...communityRecipes].sort((a,b) => b.likes - a.likes);
    for (let j = 0; j < autoFillSettings.communityMeals && i < slots.length; j++, i++) newPlan[slots[i].d][slots[i].mt] = popular[j % popular.length];
    const untried = sampleRecipes.filter(r => r.timesMade === 0).sort(() => Math.random() - 0.5);
    for (let j = 0; j < autoFillSettings.untriedRecipes && i < slots.length; j++, i++) newPlan[slots[i].d][slots[i].mt] = untried[j % untried.length];
    setMealPlan(newPlan);
    saveMealPlan(newPlan);
    setShowAutoFillModal(false);
  };

  const filterRecipes = (recipes) => recipes.filter(r => {
    if (recipeFilters.cookTime === 'quick' && r.cookTime >= 20) return false;
    if (recipeFilters.cookTime === 'medium' && (r.cookTime < 20 || r.cookTime > 40)) return false;
    if (recipeFilters.cookTime === 'long' && r.cookTime <= 40) return false;
    if (recipeFilters.tried === 'tried' && r.timesMade === 0) return false;
    if (recipeFilters.tried === 'untried' && r.timesMade > 0) return false;
    if (recipeFilters.mealType !== 'all' && !r.tags?.some(t => t.toLowerCase() === recipeFilters.mealType)) return false;
    if (recipeFilters.author !== 'all' && r.author !== recipeFilters.author) return false;
    return true;
  });

  const generateShoppingList = () => {
    const map = {};
    Object.values(mealPlan).forEach(day => Object.values(day).forEach(meal => {
      if (meal?.ingredients) meal.ingredients.forEach(ing => { const k = ing.toLowerCase().trim(); map[k] = (map[k]||0)+1; });
    }));
    const cats = {Produce:[],Proteins:[],Dairy:[],Pantry:[],Seasonings:[],Other:[]};
    const keys = {Produce:['tomato','cucumber','onion','pepper','broccoli','kale','avocado','lemon','basil','parsley','potato'],Proteins:['chicken','beef','shrimp','salmon','egg','tofu','pork','fish'],Dairy:['cheese','cream','milk','butter','yogurt','feta','parmesan'],Pantry:['rice','pasta','quinoa','bread','soy sauce','olive oil','honey','flour','sugar','wine'],Seasonings:['salt','pepper','garlic','ginger','oregano','paprika','cumin','thyme','chili']};
    Object.keys(map).forEach(name => {
      const item = {name, count:map[name]};
      if (keys.Seasonings.some(k => name.includes(k))) cats.Seasonings.push(item);
      else if (keys.Produce.some(k => name.includes(k))) cats.Produce.push(item);
      else if (keys.Proteins.some(k => name.includes(k))) cats.Proteins.push(item);
      else if (keys.Dairy.some(k => name.includes(k))) cats.Dairy.push(item);
      else if (keys.Pantry.some(k => name.includes(k))) cats.Pantry.push(item);
      else cats.Other.push(item);
    });
    return cats;
  };

  const allMyRecipes = [...sampleRecipes, ...userRecipes];

  const FilterBar = ({ showTried=false, showAuthor=false }) => (
    <div style={{background:'#1a1a1a',borderRadius:'8px',padding:'16px',marginBottom:'24px',border:'1px solid #262626'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))',gap:'10px'}}>
        {[
          {label:'Cook Time',key:'cookTime',opts:[['all','All Times'],['quick','Quick < 20min'],['medium','20-40min'],['long','40+min']]},
          {label:'Meal Type',key:'mealType',opts:[['all','All Meals'],['breakfast','Breakfast'],['lunch','Lunch'],['dinner','Dinner']]},
          ...(showTried?[{label:'Status',key:'tried',opts:[['all','All'],['tried','Tried'],['untried','Not Tried']]}]:[]),
          ...(showAuthor?[{label:'Author',key:'author',opts:[['all','All Authors'],...[...new Set(communityRecipes.map(r=>r.author))].sort().map(a=>[a,a])]}]:[])
        ].map(({label,key,opts}) => (
          <div key={key}>
            <label style={{display:'block',marginBottom:'4px',fontSize:'11px',fontWeight:600,color:'#999',textTransform:'uppercase'}}>{label}</label>
            <select value={recipeFilters[key]} onChange={e => setRecipeFilters(p=>({...p,[key]:e.target.value}))}
              style={{width:'100%',padding:'8px',border:'1px solid #262626',borderRadius:'6px',fontSize:'13px',background:'#0a0a0a',color:'#fff',cursor:'pointer'}}>
              {opts.map(([v,t]) => <option key={v} value={v}>{t}</option>)}
            </select>
          </div>
        ))}
        <div style={{display:'flex',alignItems:'flex-end'}}>
          <button onClick={() => setRecipeFilters({cookTime:'all',mealType:'all',tried:'all',author:'all'})}
            style={{width:'100%',padding:'8px',background:'#262626',border:'none',borderRadius:'6px',fontSize:'13px',fontWeight:600,cursor:'pointer',color:'#fff'}}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );

  if (loadingSession) return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p style={{color:'#999',fontSize:'18px'}}>Loading...</p>
    </div>
  );

  if (!session) return <AuthScreen />;

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',fontFamily:'system-ui, sans-serif',color:'#fff'}}>

      {/* Header */}
      <div style={{background:'rgba(0,0,0,0.95)',borderBottom:'1px solid #262626',position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:'1400px',margin:'0 auto',padding:'10px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <img src="https://www.dropbox.com/scl/fi/odkvuob40yhyittqba8k5/ChatGPT-Image-Feb-16-2026-06_37_13-PM.png?rlkey=k89onj2ds29ikovgm8b70dniv&st=p7vuda88&dl=1" alt="Logo" style={{width:'80px',height:'80px',objectFit:'contain'}} />
            <div>
              <h1 style={{margin:0,fontSize:'26px',fontWeight:700,color:'#fff'}}>Recipe Roulette</h1>
              <p style={{margin:0,fontSize:'12px',color:'#666'}}>Plan together, eat better</p>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <nav style={{display:'flex',gap:'6px'}}>
              {[{id:'home',label:'Home'},{id:'calendar',label:'My Meals'},{id:'recipes',label:'Recipe Book'},{id:'community',label:'Community'},{id:'settings',label:'Settings'}].map(item => (
                <button key={item.id} onClick={() => setCurrentView(item.id)}
                  style={{padding:'8px 16px',background:currentView===item.id?'#ffffff':'transparent',color:currentView===item.id?'#000':'#999',border:currentView===item.id?'none':'1px solid #262626',borderRadius:'8px',cursor:'pointer',fontWeight:600,fontSize:'13px'}}>
                  {item.label}
                </button>
              ))}
            </nav>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginLeft:'12px',paddingLeft:'12px',borderLeft:'1px solid #262626'}}>
              {saving && <span style={{fontSize:'11px',color:'#51cf66',fontWeight:600}}>Saving...</span>}
              <button onClick={() => setShowProfilePanel(true)}
                style={{display:'flex',alignItems:'center',gap:'9px',background:'#1a1a1a',border:'1px solid #262626',borderRadius:'24px',padding:'5px 12px 5px 5px',cursor:'pointer',transition:'border-color 0.15s'}}>
                {/* Avatar circle */}
                <div style={{width:'30px',height:'30px',borderRadius:'50%',overflow:'hidden',background:'#262626',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {profile.avatarUrl
                    ? <img src={profile.avatarUrl} alt="avatar" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                    : <span style={{fontSize:'14px',fontWeight:700,color:'#fff'}}>{(profile.displayName || session.user.email).charAt(0).toUpperCase()}</span>
                  }
                </div>
                <span style={{fontSize:'13px',fontWeight:600,color:'#fff',maxWidth:'110px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                  {profile.displayName || session.user.email.split('@')[0]}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'28px 24px'}}>


        {/* HOME FEED */}
        {currentView === 'home' && (
          <div style={{maxWidth:'680px', margin:'0 auto'}}>

            {/* Greeting */}
            <div style={{marginBottom:'28px'}}>
              <h2 style={{fontSize:'28px',fontWeight:700,color:'#fff',margin:'0 0 4px 0'}}>
                {(() => { const h = new Date().getHours(); return `Good ${h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'}, ${session.user.email.split('@')[0]} 👋`; })()}
              </h2>
              <p style={{color:'#666',margin:0,fontSize:'14px'}}>Here's what's cooking today</p>
            </div>

            {/* Category filter pills */}
            {(() => {
              const filters = [
                {id:'all', label:'All'},
                {id:'seasonal', label:'🌸 Seasonal'},
                {id:'quick', label:'⚡ Quick Meals'},
                {id:'tip', label:'💡 Tips'},
                {id:'nutrition', label:'🥗 Nutrition'},
                {id:'community', label:'⭐ Community'},
              ];
              const filtered = activeFilter === 'all' ? feedPosts : feedPosts.filter(p => p.category === activeFilter);

              return (
                <div>
                  <div style={{display:'flex',gap:'8px',marginBottom:'24px',overflowX:'auto',paddingBottom:'4px'}}>
                    {filters.map(f => (
                      <button key={f.id} onClick={() => setActiveFilter(f.id)}
                        style={{padding:'7px 16px',background:activeFilter===f.id?'#ffffff':'#1a1a1a',color:activeFilter===f.id?'#000':'#999',border:activeFilter===f.id?'none':'1px solid #262626',borderRadius:'20px',cursor:'pointer',fontWeight:600,fontSize:'13px',whiteSpace:'nowrap',transition:'all 0.15s'}}>
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Feed cards */}
                  <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                    {filtered.map((post, idx) => {
                      const isSaved = savedPosts.has(post.id);
                      const isHero = post.type === 'hero';
                      const isTip = post.type === 'tip';

                      return (
                        <div key={post.id} style={{background:'#1a1a1a',borderRadius:'16px',overflow:'hidden',border:'1px solid #262626',transition:'transform 0.15s'}}>

                          {/* Image — full width for hero, shorter for others */}
                          {(isHero || !isTip) && (
                            <div style={{position:'relative',height:isHero?'320px':'200px',backgroundImage:`url(${post.image})`,backgroundSize:'cover',backgroundPosition:'center'}}>
                              <div style={{position:'absolute',inset:0,background:isHero?'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)':'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)'}}>
                              </div>
                              {/* Tag badge */}
                              <div style={{position:'absolute',top:'14px',left:'14px',background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',padding:'5px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:600,color:'#fff',border:'1px solid rgba(255,255,255,0.15)'}}>
                                {post.tag}
                              </div>
                              {/* Title on image for hero */}
                              {isHero && (
                                <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px'}}>
                                  <h3 style={{margin:0,fontSize:'22px',fontWeight:700,color:'#fff',lineHeight:1.3}}>{post.title}</h3>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Card body */}
                          <div style={{padding:'18px'}}>
                            {/* Tag for tip cards (no image header) */}
                            {isTip && (
                              <div style={{display:'inline-block',background:'#262626',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:600,color:'#999',marginBottom:'10px',border:'1px solid #333'}}>
                                {post.tag}
                              </div>
                            )}

                            {/* Title for non-hero */}
                            {!isHero && (
                              <h3 style={{margin:'0 0 8px 0',fontSize:'18px',fontWeight:700,color:'#fff',lineHeight:1.3}}>{post.title}</h3>
                            )}

                            <p style={{margin:'0 0 16px 0',fontSize:'14px',color:'#999',lineHeight:1.7}}>{post.body}</p>

                            {/* Recipe card inside post */}
                            {post.recipe && (
                              <div onClick={() => setSelectedRecipe(post.recipe)}
                                style={{background:'#262626',borderRadius:'10px',overflow:'hidden',cursor:'pointer',border:'1px solid #333',display:'flex',gap:'0',marginBottom:'14px',transition:'border-color 0.15s'}}>
                                <div style={{width:'90px',minWidth:'90px',backgroundImage:`url(${post.recipe.image})`,backgroundSize:'cover',backgroundPosition:'center'}} />
                                <div style={{padding:'12px',flex:1}}>
                                  <p style={{margin:'0 0 3px 0',fontSize:'13px',fontWeight:700,color:'#fff'}}>{post.recipe.name}</p>
                                  <p style={{margin:'0 0 6px 0',fontSize:'11px',color:'#666'}}>{post.recipe.prepTime} • {post.recipe.servings} servings</p>
                                  <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                                    {post.recipe.tags?.slice(0,3).map(tag => (
                                      <span key={tag} style={{background:'#1a1a1a',border:'1px solid #333',padding:'2px 8px',borderRadius:'10px',fontSize:'10px',color:'#999'}}>{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Action row */}
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                              <span style={{fontSize:'12px',color:'#555'}}>Recipe Roulette</span>
                              {post.recipe && (
                                <div style={{display:'flex',gap:'8px'}}>
                                  <button
                                    onClick={() => {
                                      if (!isSaved) {
                                        setSavedPosts(prev => new Set([...prev, post.id]));
                                        if (post.recipe && !userRecipes.find(r => r.id === post.recipe.id)) {
                                          const nr = {...post.recipe, timesMade:0};
                                          setUserRecipes(prev => [...prev, nr]);
                                          supabase.from('user_recipes').insert({user_id:session.user.id, recipe:nr});
                                        }
                                      }
                                    }}
                                    style={{padding:'7px 14px',background:isSaved?'#262626':'#ffffff',color:isSaved?'#666':'#000',border:'none',borderRadius:'8px',fontSize:'12px',fontWeight:600,cursor:isSaved?'not-allowed':'pointer',display:'flex',alignItems:'center',gap:'5px',transition:'all 0.15s'}}>
                                    {isSaved ? '✓ Saved' : '+ Save Recipe'}
                                  </button>
                                  <button onClick={() => setShowAddToCalendar(post.recipe)}
                                    style={{padding:'7px 14px',background:'#1a1a1a',color:'#fff',border:'1px solid #333',borderRadius:'8px',fontSize:'12px',fontWeight:600,cursor:'pointer',transition:'all 0.15s'}}>
                                    Add to Calendar
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* MY MEALS */}
        {currentView === 'calendar' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <div>
                <h2 style={{fontSize:'30px',fontWeight:700,color:'#fff',margin:'0 0 4px 0'}}>Weekly Meal Plan</h2>
                <p style={{color:'#666',margin:0,fontSize:'13px'}}>Drag meals to rearrange • Click to view details</p>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={() => setShowAutoFillModal(true)} style={{padding:'10px 18px',background:'#ffffff',border:'none',borderRadius:'8px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontWeight:600,fontSize:'13px',color:'#000'}}>
                  <Wand2 size={16} /> Auto-Fill
                </button>
                <button onClick={() => setShowShoppingList(true)} style={{padding:'10px 18px',background:'#1a1a1a',border:'1px solid #262626',borderRadius:'8px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontWeight:600,fontSize:'13px',color:'#fff'}}>
                  <ShoppingCart size={16} /> Shopping List
                </button>
                <button onClick={clearAllMeals} style={{padding:'10px 18px',background:'#1a1a1a',border:'1px solid #ff4444',borderRadius:'8px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontWeight:600,fontSize:'13px',color:'#ff4444'}}>
                  <X size={16} /> Clear All
                </button>
              </div>
            </div>
            <div style={{background:'#1a1a1a',borderRadius:'8px',padding:'20px',border:'1px solid #262626'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7, 1fr)',gap:'10px'}}>
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={day} style={{background:'#262626',borderRadius:'8px',padding:'10px'}}>
                    <h3 style={{margin:'0 0 10px 0',fontSize:'11px',fontWeight:700,color:'#fff',textAlign:'center',textTransform:'uppercase',letterSpacing:'0.5px'}}>{day.slice(0,3)}</h3>
                    {mealTypes.map(mealType => {
                      const disabled = isSlotDisabled(dayIndex, mealType);
                      const meal = mealPlan[dayIndex][mealType];
                      return (
                        <div key={mealType} onDragOver={handleDragOver} onDrop={() => handleDrop(dayIndex, mealType)}
                          style={{background:'#1a1a1a',borderRadius:'8px',padding:'8px',marginBottom:'8px',minHeight:'68px',border:disabled?'2px solid #333':'2px dashed #262626',position:'relative',opacity:disabled?0.5:1}}>
                          {!meal && (
                            <button onClick={() => toggleSlotDisabled(dayIndex, mealType)}
                              style={{position:'absolute',top:'-7px',right:'-7px',background:disabled?'#51cf66':'#ff4444',border:'2px solid #1a1a1a',borderRadius:'50%',width:'20px',height:'20px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',padding:0,zIndex:10,color:'white',fontSize:'13px',fontWeight:'bold'}}>
                              {disabled ? '+' : <X size={10} />}
                            </button>
                          )}
                          <p style={{margin:'0 0 5px 0',fontSize:'9px',color:'#999',textTransform:'uppercase',fontWeight:600}}>{mealType}</p>
                          {disabled ? (
                            <p style={{margin:0,fontSize:'10px',color:'#555',textAlign:'center',paddingTop:'6px'}}>Disabled</p>
                          ) : meal ? (
                            <div draggable onDragStart={() => handleDragStart(dayIndex, mealType, meal)} onClick={() => setSelectedRecipe(meal)}
                              style={{background:'#fff',borderRadius:'6px',padding:'6px',position:'relative',cursor:'pointer'}}>
                              <button onClick={e => { e.stopPropagation(); removeMealFromPlan(dayIndex, mealType); }}
                                style={{position:'absolute',top:'3px',right:'3px',background:'rgba(0,0,0,0.4)',border:'none',borderRadius:'50%',width:'16px',height:'16px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',padding:0}}>
                                <X size={10} color="white" />
                              </button>
                              <p style={{margin:0,fontSize:'10px',color:'#000',fontWeight:600,paddingRight:'14px',lineHeight:1.3}}>{meal.name}</p>
                              {meal.cookTime < 20 && <span style={{fontSize:'9px',color:'#555'}}>Quick</span>}
                            </div>
                          ) : (
                            <button onClick={() => setShowRecipeSelector({dayIndex, mealType})}
                              style={{background:'none',border:'none',cursor:'pointer',color:'#555',fontSize:'20px',width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RECIPE BOOK */}
        {currentView === 'recipes' && (
          <div>
            {activeFolder === null ? (
              /* ── FOLDER GRID VIEW ── */
              <div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
                  <div>
                    <h2 style={{fontSize:'30px',fontWeight:700,color:'#fff',margin:'0 0 4px 0'}}>Recipe Book</h2>
                    <p style={{color:'#666',margin:0}}>{folders.length} folders • {allMyRecipes.length} recipes</p>
                  </div>
                  <div style={{display:'flex',gap:'10px'}}>
                    <button onClick={() => setShowFolderModal(true)} style={{padding:'10px 18px',background:'#1a1a1a',border:'1px solid #262626',borderRadius:'8px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontWeight:600,fontSize:'13px',color:'#fff'}}>
                      <Plus size={16} /> New Folder
                    </button>
                    <button onClick={() => setShowAddRecipeModal(true)} style={{padding:'10px 18px',background:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontWeight:600,fontSize:'13px',color:'#000'}}>
                      <Plus size={16} /> Add Recipe
                    </button>
                  </div>
                </div>

                {/* All Recipes folder card first */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'16px'}}>

                  {/* All Recipes special card */}
                  <div onClick={() => setActiveFolder('all')} style={{background:'#1a1a1a',borderRadius:'16px',overflow:'hidden',border:'1px solid #262626',cursor:'pointer',transition:'border-color 0.15s'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',height:'180px',gap:'2px'}}>
                      {allMyRecipes.slice(0,4).map((r,i) => (
                        <div key={i} style={{backgroundImage:`url(${r.image})`,backgroundSize:'cover',backgroundPosition:'center'}} />
                      ))}
                      {allMyRecipes.length < 4 && Array.from({length: 4 - allMyRecipes.length}).map((_,i) => (
                        <div key={i} style={{background:'#262626'}} />
                      ))}
                    </div>
                    <div style={{padding:'14px'}}>
                      <p style={{margin:'0 0 2px 0',fontSize:'16px',fontWeight:700,color:'#fff'}}>📚 All Recipes</p>
                      <p style={{margin:0,fontSize:'12px',color:'#666'}}>{allMyRecipes.length} recipes</p>
                    </div>
                  </div>

                  {/* Folder cards */}
                  {folders.map(folder => {
                    const folderRecipes = folder.recipes.map(rid => allMyRecipes.find(r => r.id === rid)).filter(Boolean);
                    return (
                      <div key={folder.id} onClick={() => setActiveFolder(folder.id)} style={{background:'#1a1a1a',borderRadius:'16px',overflow:'hidden',border:'1px solid #262626',cursor:'pointer',transition:'border-color 0.15s'}}>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',height:'180px',gap:'2px',position:'relative'}}>
                          {folderRecipes.slice(0,4).map((r,i) => (
                            <div key={i} style={{backgroundImage:`url(${r.image})`,backgroundSize:'cover',backgroundPosition:'center'}} />
                          ))}
                          {folderRecipes.length < 4 && Array.from({length: 4 - Math.min(folderRecipes.length,4)}).map((_,i) => (
                            <div key={i} style={{background:'#262626',display:'flex',alignItems:'center',justifyContent:'center'}}>
                              {folderRecipes.length === 0 && i === 1 && <span style={{fontSize:'32px',opacity:0.3}}>{folder.emoji}</span>}
                            </div>
                          ))}
                        </div>
                        <div style={{padding:'14px'}}>
                          <p style={{margin:'0 0 2px 0',fontSize:'16px',fontWeight:700,color:'#fff'}}>{folder.emoji} {folder.name}</p>
                          <p style={{margin:0,fontSize:'12px',color:'#666'}}>{folderRecipes.length} {folderRecipes.length === 1 ? 'recipe' : 'recipes'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            ) : (
              /* ── FOLDER DETAIL VIEW ── */
              <div>
                {/* Back button + header */}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                    <button onClick={() => setActiveFolder(null)} style={{background:'#1a1a1a',border:'1px solid #262626',borderRadius:'8px',width:'38px',height:'38px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'18px',color:'#fff'}}>
                      ←
                    </button>
                    <div>
                      <h2 style={{fontSize:'26px',fontWeight:700,color:'#fff',margin:'0 0 2px 0'}}>
                        {activeFolder === 'all' ? '📚 All Recipes' : (() => { const f = folders.find(f => f.id === activeFolder); return f ? `${f.emoji} ${f.name}` : ''; })()}
                      </h2>
                      <p style={{margin:0,fontSize:'13px',color:'#666'}}>
                        {activeFolder === 'all' ? allMyRecipes.length : (() => { const f = folders.find(f => f.id === activeFolder); return f ? f.recipes.map(rid => allMyRecipes.find(r => r.id === rid)).filter(Boolean).length : 0; })()} recipes
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowAddRecipeModal(true)} style={{padding:'10px 18px',background:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',fontWeight:600,fontSize:'13px',color:'#000'}}>
                    <Plus size={16} /> Add Recipe
                  </button>
                </div>

                {/* Filter bar for all recipes view */}
                {activeFolder === 'all' && <FilterBar showTried />}

                {/* Recipe grid */}
                {(() => {
                  const recipesToShow = activeFolder === 'all'
                    ? filterRecipes(allMyRecipes)
                    : (() => { const f = folders.find(f => f.id === activeFolder); return f ? f.recipes.map(rid => allMyRecipes.find(r => r.id === rid)).filter(Boolean) : []; })();
                  return recipesToShow.length === 0 ? (
                    <div style={{textAlign:'center',padding:'60px',background:'#1a1a1a',borderRadius:'12px',border:'2px dashed #262626'}}>
                      <p style={{fontSize:'36px',margin:'0 0 10px 0'}}>📭</p>
                      <p style={{color:'#999',fontSize:'16px',fontWeight:600,margin:'0 0 6px 0'}}>No recipes here yet</p>
                      <p style={{color:'#555',fontSize:'13px',margin:0}}>Save recipes to this folder using the bookmark button on any recipe card</p>
                    </div>
                  ) : (
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',gap:'18px'}}>
                      {recipesToShow.map(recipe => (
                        <div key={recipe.id} style={{background:'#1a1a1a',borderRadius:'12px',overflow:'hidden',border:'1px solid #262626'}}>
                          <div onClick={() => setSelectedRecipe(recipe)} style={{cursor:'pointer'}}>
                            <div style={{height:'170px',backgroundImage:`url(${recipe.image})`,backgroundSize:'cover',backgroundPosition:'center',position:'relative'}}>
                              {recipe.timesMade === 0 && <div style={{position:'absolute',top:'10px',right:'10px',background:'#ff6b6b',color:'white',padding:'3px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:600}}>Not Tried</div>}
                              {recipe.cookTime < 20 && <div style={{position:'absolute',top:'10px',left:'10px',background:'#51cf66',color:'white',padding:'3px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:600,display:'flex',alignItems:'center',gap:'3px'}}><Clock size={11} /> Quick</div>}
                            </div>
                            <div style={{padding:'14px 14px 8px'}}>
                              <h3 style={{margin:'0 0 6px 0',fontSize:'15px',fontWeight:700,color:'#fff'}}>{recipe.name}</h3>
                              <RatingDisplay recipeId={recipe.id} compact />
                              <p style={{margin:'6px 0 3px 0',fontSize:'12px',color:'#999'}}>{recipe.prepTime} • {recipe.servings} servings</p>
                              <p style={{margin:0,fontSize:'12px',color:'#666'}}>Made {recipe.timesMade} times</p>
                            </div>
                          </div>
                          <div style={{padding:'8px 14px 14px',display:'flex',gap:'6px',flexWrap:'wrap'}}>
                            <button onClick={e => { e.stopPropagation(); setShowRatingModal(recipe); }} style={{flex:'1 1 auto',padding:'7px',background:userRatings[recipe.id]?'#1a1a1a':'#262626',color:userRatings[recipe.id]?'#fbbf24':'#999',border:'1px solid #333',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                              {userRatings[recipe.id] ? `★ ${userRatings[recipe.id].rating}` : '☆ Rate'}
                            </button>
                            <button onClick={e => { e.stopPropagation(); setShowSaveToFolderModal(recipe); }} style={{flex:'1 1 auto',padding:'7px',background:'#1a1a1a',color:'#fff',border:'1px solid #333',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                              🗂 Folder
                            </button>
                            <button onClick={e => { e.stopPropagation(); setShowAddToCalendar(recipe); }} style={{flex:'1 1 auto',padding:'7px',background:'#fff',color:'#000',border:'none',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                              📅 Cal
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* COMMUNITY */}
        {currentView === 'community' && (
          <div>
            <div style={{marginBottom:'20px'}}>
              <h2 style={{fontSize:'30px',fontWeight:700,color:'#fff',margin:'0 0 4px 0'}}>Community Recipes</h2>
              <p style={{color:'#666',margin:0}}>{filterRecipes(communityRecipes).length} recipes</p>
            </div>
            <FilterBar showAuthor />
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',gap:'18px'}}>
              {filterRecipes(communityRecipes).length === 0 ? (
                <div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px',background:'#1a1a1a',borderRadius:'12px',border:'1px solid #262626'}}>
                  <p style={{color:'#999'}}>No recipes match your filters</p>
                </div>
              ) : filterRecipes(communityRecipes).map(recipe => (
                <div key={recipe.id} style={{background:'#1a1a1a',borderRadius:'12px',overflow:'hidden',border:'1px solid #262626'}}>
                  <div onClick={() => setSelectedRecipe(recipe)} style={{cursor:'pointer'}}>
                    <div style={{height:'170px',backgroundImage:`url(${recipe.image})`,backgroundSize:'cover',backgroundPosition:'center',position:'relative'}}>
                      {recipe.cookTime < 20 && <div style={{position:'absolute',top:'10px',left:'10px',background:'#51cf66',color:'white',padding:'3px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:600,display:'flex',alignItems:'center',gap:'3px'}}><Clock size={11} /> Quick</div>}
                    </div>
                    <div style={{padding:'14px 14px 8px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
                        <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontSize:'10px',fontWeight:700}}>{recipe.avatar}</div>
                        <span style={{fontSize:'12px',color:'#666'}}>{recipe.author}</span>
                      </div>
                      <h3 style={{margin:'0 0 6px 0',fontSize:'15px',fontWeight:700,color:'#fff'}}>{recipe.name}</h3>
                      <RatingDisplay recipeId={recipe.id} compact />
                      <p style={{margin:'6px 0 8px 0',fontSize:'12px',color:'#999'}}>{recipe.prepTime}</p>
                      <div style={{display:'flex',gap:'14px',fontSize:'12px',color:'#666'}}>
                        <span style={{display:'flex',alignItems:'center',gap:'3px'}}><Heart size={11} /> {recipe.likes}</span>
                        <span>{recipe.onMenu} on menu</span>
                        <span style={{display:'flex',alignItems:'center',gap:'3px'}}><Archive size={11} /> {recipe.saves + (savedRecipes.has(recipe.id)?1:0)}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{padding:'8px 14px 14px',display:'flex',gap:'6px',flexWrap:'wrap'}}>
                    <button onClick={e => { e.stopPropagation(); setShowRatingModal(recipe); }} style={{flex:'1 1 45%',padding:'7px',background:userRatings[recipe.id]?'#1a1a1a':'#262626',color:userRatings[recipe.id]?'#fbbf24':'#999',border:'1px solid #333',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                      {userRatings[recipe.id] ? `★ ${userRatings[recipe.id].rating}` : '☆ Rate'}
                    </button>
                    <button onClick={e => { e.stopPropagation(); saveCommunityRecipe(recipe); }} disabled={savedRecipes.has(recipe.id)}
                      style={{flex:'1 1 45%',padding:'7px',background:savedRecipes.has(recipe.id)?'#262626':'#1a1a1a',color:savedRecipes.has(recipe.id)?'#666':'#fff',border:'1px solid #333',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:savedRecipes.has(recipe.id)?'not-allowed':'pointer'}}>
                      {savedRecipes.has(recipe.id) ? '✓ Book' : '+ Book'}
                    </button>
                    <button onClick={e => { e.stopPropagation(); setShowSaveToFolderModal(recipe); }}
                      style={{flex:'1 1 30%',padding:'7px',background:'#1a1a1a',color:'#fff',border:'1px solid #333',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                      🗂
                    </button>
                    <button onClick={e => { e.stopPropagation(); setShowAddToCalendar(recipe); }}
                      style={{flex:'1 1 30%',padding:'7px',background:'#fff',color:'#000',border:'none',borderRadius:'6px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
                      📅
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {currentView === 'settings' && (
          <div>
            <h2 style={{fontSize:'30px',fontWeight:700,color:'#fff',margin:'0 0 6px 0'}}>Settings</h2>
            <p style={{color:'#999',margin:'0 0 24px 0'}}>Toggle which meals to plan each day</p>
            <div style={{background:'#1a1a1a',borderRadius:'8px',padding:'28px',border:'1px solid #262626'}}>
              <h3 style={{margin:'0 0 20px 0',fontSize:'18px',fontWeight:700,color:'#fff'}}>Weekly Meal Schedule</h3>
              <table style={{width:'100%',borderCollapse:'separate',borderSpacing:'0 8px'}}>
                <thead>
                  <tr>{['Day','Breakfast','Lunch','Dinner'].map(h => <th key={h} style={{padding:'6px 12px',textAlign:h==='Day'?'left':'center',fontWeight:700,color:'#fff',fontSize:'12px',textTransform:'uppercase',letterSpacing:'0.5px'}}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {daysOfWeek.map((day, di) => (
                    <tr key={day} style={{background:'#262626'}}>
                      <td style={{padding:'12px 14px',fontWeight:600,color:'#fff',borderRadius:'8px 0 0 8px'}}>{day}</td>
                      {['breakfast','lunch','dinner'].map((mt, i) => (
                        <td key={mt} style={{padding:'12px 14px',textAlign:'center',borderRadius:i===2?'0 8px 8px 0':0}}>
                          <label style={{position:'relative',display:'inline-block',width:'44px',height:'24px',cursor:'pointer'}}>
                            <input type="checkbox" checked={mealTypeSettings[di][mt]} onChange={e => {
                              const on = e.target.checked;
                              setMealTypeSettings(p => ({...p,[di]:{...p[di],[mt]:on}}));
                              const key = `${di}-${mt}`;
                              if (!on) { setDisabledSlots(p => ({...p,[key]:true})); removeMealFromPlan(di, mt); }
                              else { setDisabledSlots(p => { const n={...p}; delete n[key]; return n; }); }
                            }} style={{opacity:0,width:0,height:0}} />
                            <span style={{position:'absolute',inset:0,background:mealTypeSettings[di][mt]?'#ffffff':'#333',borderRadius:'12px',transition:'0.3s'}}>
                              <span style={{position:'absolute',height:'16px',width:'16px',left:mealTypeSettings[di][mt]?'24px':'4px',bottom:'4px',background:mealTypeSettings[di][mt]?'#000':'#999',borderRadius:'50%',transition:'0.3s'}} />
                            </span>
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{marginTop:'20px',padding:'14px',background:'#262626',borderRadius:'8px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontWeight:600,color:'#fff'}}>Total meals enabled</span>
                <span style={{fontSize:'22px',fontWeight:700,color:'#fff'}}>{Object.values(mealTypeSettings).reduce((t,d) => t+Object.values(d).filter(Boolean).length, 0)}</span>
              </div>
              <div style={{display:'flex',gap:'10px',marginTop:'16px'}}>
                <button onClick={() => { const s={}; for(let i=0;i<7;i++) s[i]={breakfast:true,lunch:true,dinner:true}; setMealTypeSettings(s); setDisabledSlots({}); }}
                  style={{padding:'10px 18px',background:'#fff',border:'none',borderRadius:'8px',fontWeight:600,cursor:'pointer',color:'#000'}}>Enable All</button>
                <button onClick={() => {
                  const s={}, ds={};
                  for(let i=0;i<7;i++) { const wd=i>0&&i<6; s[i]={breakfast:wd,lunch:wd,dinner:wd}; if(!wd){ds[`${i}-breakfast`]=true;ds[`${i}-lunch`]=true;ds[`${i}-dinner`]=true;} }
                  setMealTypeSettings(s); setDisabledSlots(ds);
                }} style={{padding:'10px 18px',background:'#262626',border:'1px solid #333',borderRadius:'8px',fontWeight:600,cursor:'pointer',color:'#fff'}}>Weekdays Only</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── RATING MODAL ── */}
      {showRatingModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'16px',padding:'28px',maxWidth:'400px',width:'100%',border:'1px solid #262626',textAlign:'center'}}>
            <h2 style={{margin:'0 0 8px 0',fontSize:'20px',fontWeight:700,color:'#fff'}}>Rate this recipe</h2>
            <p style={{margin:'0 0 20px 0',fontSize:'14px',color:'#666',fontWeight:600}}>{showRatingModal.name}</p>
            
            {/* Current rating if exists */}
            {userRatings[showRatingModal.id] && (
              <p style={{margin:'0 0 16px 0',fontSize:'13px',color:'#51cf66'}}>
                ✓ You rated this {userRatings[showRatingModal.id].rating} stars
              </p>
            )}

            {/* Interactive stars */}
            <div style={{display:'flex',justifyContent:'center',marginBottom:'24px'}}>
              <StarRating rating={userRatings[showRatingModal.id]?.rating || 0} size={40} interactive onRate={(r) => saveRating(showRatingModal.id, r)} />
            </div>

            <p style={{margin:'0 0 20px 0',fontSize:'12px',color:'#555'}}>Tap a star to rate</p>

            <button onClick={() => setShowRatingModal(null)}
              style={{width:'100%',padding:'11px',background:'#262626',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:600,color:'#fff',fontSize:'13px'}}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── PROFILE SLIDE-OUT PANEL ── */}
      {showProfilePanel && (
        <>
          {/* Backdrop */}
          <div onClick={() => setShowProfilePanel(false)}
            style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:200,backdropFilter:'blur(2px)'}} />

          {/* Panel */}
          <div style={{position:'fixed',top:0,right:0,bottom:0,width:'380px',background:'#111',borderLeft:'1px solid #262626',zIndex:201,display:'flex',flexDirection:'column',overflowY:'auto'}}>

            {/* Panel header */}
            <div style={{padding:'20px 24px',borderBottom:'1px solid #1e1e1e',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
              <h2 style={{margin:0,fontSize:'18px',fontWeight:700,color:'#fff'}}>Your Profile</h2>
              <button onClick={() => setShowProfilePanel(false)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px'}}><X size={20} color="#666" /></button>
            </div>

            <div style={{padding:'24px',flex:1,display:'flex',flexDirection:'column',gap:'28px'}}>

              {/* Avatar upload */}
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'14px'}}>
                <div style={{position:'relative'}}>
                  <div style={{width:'90px',height:'90px',borderRadius:'50%',overflow:'hidden',background:'#262626',border:'3px solid #333',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {profile.avatarPreview
                      ? <img src={profile.avatarPreview} alt="avatar" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                      : <span style={{fontSize:'32px',fontWeight:700,color:'#fff'}}>{(profile.displayName || session.user.email).charAt(0).toUpperCase()}</span>
                    }
                  </div>
                  <label style={{position:'absolute',bottom:0,right:0,width:'28px',height:'28px',background:'#ffffff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',border:'2px solid #111'}}>
                    <Camera size={13} color="#000" />
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={e => {
                      const f = e.target.files[0];
                      if (f) { const r = new FileReader(); r.onloadend = () => setProfile(p => ({...p, avatarPreview: r.result})); r.readAsDataURL(f); }
                    }} />
                  </label>
                </div>
                <p style={{margin:0,fontSize:'12px',color:'#555',textAlign:'center'}}>Tap the camera to change your photo</p>
              </div>

              {/* Display name */}
              <div>
                <label style={{display:'block',marginBottom:'8px',fontWeight:600,color:'#fff',fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Display Name</label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={e => setProfile(p => ({...p, displayName: e.target.value}))}
                  placeholder={session.user.email.split('@')[0]}
                  style={{width:'100%',padding:'11px 14px',border:'1px solid #2a2a2a',borderRadius:'8px',fontSize:'14px',background:'#1a1a1a',color:'#fff',outline:'none',boxSizing:'border-box'}}
                />
                <p style={{margin:'6px 0 0 0',fontSize:'11px',color:'#555'}}>This is how your name appears in the app</p>
              </div>

              {/* Email (read only) */}
              <div>
                <label style={{display:'block',marginBottom:'8px',fontWeight:600,color:'#fff',fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Email</label>
                <div style={{padding:'11px 14px',border:'1px solid #1e1e1e',borderRadius:'8px',fontSize:'14px',background:'#0d0d0d',color:'#555'}}>
                  {session.user.email}
                </div>
              </div>

              {/* Household size */}
              <div>
                <label style={{display:'block',marginBottom:'12px',fontWeight:600,color:'#fff',fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.5px'}}>
                  Household Size
                </label>
                <div style={{display:'flex',alignItems:'center',gap:'0'}}>
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <button key={n} onClick={() => setProfile(p => ({...p, householdSize: n}))}
                      style={{flex:1,padding:'10px 0',background:profile.householdSize===n?'#ffffff':'#1a1a1a',color:profile.householdSize===n?'#000':'#666',border:'1px solid #262626',cursor:'pointer',fontSize:'13px',fontWeight:700,
                        borderRadius: n===1?'8px 0 0 8px':n===8?'0 8px 8px 0':'0',marginLeft: n===1?0:'-1px',position:'relative',zIndex:profile.householdSize===n?1:0,transition:'all 0.1s'}}>
                      {n}{n===8?'+':''}
                    </button>
                  ))}
                </div>
                <p style={{margin:'8px 0 0 0',fontSize:'11px',color:'#555'}}>
                  {profile.householdSize === 1 ? 'Just you 🧑' : profile.householdSize <= 3 ? `${profile.householdSize} people 👥` : `${profile.householdSize} people 👨‍👩‍👧‍👦`}
                </p>
              </div>

              {/* Dietary preferences */}
              <div>
                <label style={{display:'block',marginBottom:'12px',fontWeight:600,color:'#fff',fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Dietary Preferences</label>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {[
                    {id:'whole30', label:'💪 Whole30'},
                    {id:'vegetarian', label:'🥦 Vegetarian'},
                    {id:'vegan', label:'🌱 Vegan'},
                    {id:'gluten-free', label:'🌾 Gluten-Free'},
                    {id:'dairy-free', label:'🥛 Dairy-Free'},
                    {id:'keto', label:'🥩 Keto'},
                    {id:'paleo', label:'🍖 Paleo'},
                    {id:'nut-free', label:'🥜 Nut-Free'},
                    {id:'low-carb', label:'📉 Low-Carb'},
                    {id:'high-protein', label:'💪 High-Protein'}
                  ].map(pref => {
                    const active = profile.dietaryPrefs.includes(pref.id);
                    return (
                      <button key={pref.id} onClick={() => setProfile(p => ({...p, dietaryPrefs: active ? p.dietaryPrefs.filter(x => x !== pref.id) : [...p.dietaryPrefs, pref.id]}))}
                        style={{padding:'7px 14px',background:active?'#ffffff':'#1a1a1a',color:active?'#000':'#888',border:`1px solid ${active?'#fff':'#2a2a2a'}`,borderRadius:'20px',cursor:'pointer',fontSize:'13px',fontWeight:600,transition:'all 0.15s'}}>
                        {pref.label}
                      </button>
                    );
                  })}
                </div>
                <p style={{margin:'10px 0 0 0',fontSize:'11px',color:'#555'}}>Used to personalise your experience</p>
              </div>

            </div>

            {/* Sticky footer with save + sign out */}
            <div style={{padding:'16px 24px',borderTop:'1px solid #1e1e1e',display:'flex',flexDirection:'column',gap:'10px',flexShrink:0}}>
              <button onClick={saveProfile} disabled={profileSaving}
                style={{width:'100%',padding:'13px',background:profileSaved?'#51cf66':'#ffffff',color:profileSaved?'#fff':'#000',border:'none',borderRadius:'10px',fontSize:'14px',fontWeight:700,cursor:profileSaving?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',transition:'background 0.3s',opacity:profileSaving?0.7:1}}>
                {profileSaved ? <><Check size={16} /> Saved!</> : profileSaving ? 'Saving...' : 'Save Profile'}
              </button>
              <button onClick={async () => { await supabase.auth.signOut(); setMealPlan(emptyMealPlan); setUserRecipes([]); setSavedRecipes(new Set()); setShowProfilePanel(false); }}
                style={{width:'100%',padding:'13px',background:'transparent',color:'#666',border:'1px solid #2a2a2a',borderRadius:'10px',fontSize:'14px',fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* RECIPE SELECTOR MODAL */}
      {showRecipeSelector && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'12px',padding:'24px',maxWidth:'820px',width:'100%',maxHeight:'80vh',overflow:'auto',border:'1px solid #262626'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
              <h2 style={{margin:0,fontSize:'20px',fontWeight:700,color:'#fff'}}>Choose a Recipe</h2>
              <button onClick={() => { setShowRecipeSelector(null); setRecipeSearchQuery(''); }} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#999" /></button>
            </div>
            <input type="text" placeholder="Search by name, tag or ingredient..." value={recipeSearchQuery} onChange={e => setRecipeSearchQuery(e.target.value)} autoFocus
              style={{width:'100%',padding:'10px 14px',border:'1px solid #262626',borderRadius:'8px',fontSize:'14px',background:'#0a0a0a',color:'#fff',outline:'none',marginBottom:'14px',boxSizing:'border-box'}} />
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(190px, 1fr))',gap:'10px'}}>
              {allMyRecipes.filter(r =>
                r.name.toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
                r.tags?.some(t => t.toLowerCase().includes(recipeSearchQuery.toLowerCase())) ||
                r.ingredients?.some(i => i.toLowerCase().includes(recipeSearchQuery.toLowerCase()))
              ).map(recipe => (
                <div key={recipe.id} onClick={() => { addMealToPlan(showRecipeSelector.dayIndex, showRecipeSelector.mealType, recipe); setRecipeSearchQuery(''); }}
                  style={{background:'#262626',borderRadius:'10px',overflow:'hidden',cursor:'pointer',border:'1px solid #333'}}>
                  <div style={{height:'90px',backgroundImage:`url(${recipe.image})`,backgroundSize:'cover',backgroundPosition:'center'}} />
                  <div style={{padding:'10px'}}>
                    <p style={{margin:'0 0 2px 0',fontSize:'13px',fontWeight:600,color:'#fff'}}>{recipe.name}</p>
                    <p style={{margin:0,fontSize:'11px',color:'#999'}}>{recipe.prepTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD TO CALENDAR MODAL */}
      {showAddToCalendar && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'12px',padding:'24px',maxWidth:'520px',width:'100%',maxHeight:'80vh',overflow:'auto',border:'1px solid #262626'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
              <h2 style={{margin:0,fontSize:'20px',fontWeight:700,color:'#fff'}}>Add to Calendar</h2>
              <button onClick={() => setShowAddToCalendar(null)} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#999" /></button>
            </div>
            <div style={{background:'#262626',padding:'12px',borderRadius:'8px',marginBottom:'18px'}}>
              <p style={{margin:'0 0 2px 0',fontWeight:600,color:'#fff'}}>{showAddToCalendar.name}</p>
              <p style={{margin:0,fontSize:'12px',color:'#999'}}>{showAddToCalendar.prepTime}</p>
            </div>
            <p style={{color:'#666',marginBottom:'14px',fontSize:'13px'}}>Grayed out = already filled or disabled</p>
            {daysOfWeek.map((day, di) => (
              <div key={day} style={{marginBottom:'10px'}}>
                <p style={{margin:'0 0 5px 0',fontSize:'11px',fontWeight:700,color:'#999',textTransform:'uppercase',letterSpacing:'0.5px'}}>{day}</p>
                <div style={{display:'flex',gap:'6px'}}>
                  {mealTypes.map(mt => {
                    const canAdd = !isSlotDisabled(di, mt) && !mealPlan[di][mt];
                    return (
                      <button key={mt} disabled={!canAdd} onClick={() => { addMealToPlan(di, mt, showAddToCalendar); setShowAddToCalendar(null); }}
                        style={{flex:1,padding:'9px 4px',background:canAdd?'#fff':'#262626',color:canAdd?'#000':'#555',border:canAdd?'none':'1px solid #333',borderRadius:'6px',fontSize:'12px',fontWeight:600,cursor:canAdd?'pointer':'not-allowed',textTransform:'capitalize',opacity:canAdd?1:0.6}}>
                        {mt}
                        {mealPlan[di][mt] && <span style={{display:'block',fontSize:'9px',color:'#888'}}>filled</span>}
                        {isSlotDisabled(di,mt) && <span style={{display:'block',fontSize:'9px',color:'#888'}}>off</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHOPPING LIST MODAL */}
      {showShoppingList && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'12px',padding:'24px',maxWidth:'520px',width:'100%',maxHeight:'80vh',overflow:'auto',border:'1px solid #262626'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
              <h2 style={{margin:0,fontSize:'20px',fontWeight:700,color:'#fff'}}>Shopping List</h2>
              <button onClick={() => setShowShoppingList(false)} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#999" /></button>
            </div>
            {(() => {
              const list = generateShoppingList();
              const hasItems = Object.values(list).some(a => a.length > 0);
              if (!hasItems) return <p style={{color:'#999',textAlign:'center',padding:'40px 0'}}>No meals planned yet!</p>;
              return Object.entries(list).map(([cat, items]) => {
                if (!items.length) return null;
                return (
                  <div key={cat} style={{marginBottom:'18px'}}>
                    <h3 style={{margin:'0 0 8px 0',fontSize:'13px',fontWeight:700,color:'#fff',textTransform:'uppercase',letterSpacing:'0.5px'}}>{cat}</h3>
                    {items.map((item, i) => (
                      <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<items.length-1?'1px solid #262626':'none'}}>
                        <span style={{fontSize:'14px',color:'#ccc'}}>{item.name}</span>
                        {item.count > 1 && <span style={{background:'#fff',color:'#000',padding:'2px 8px',borderRadius:'10px',fontSize:'11px',fontWeight:700}}>x{item.count}</span>}
                      </div>
                    ))}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* AUTO-FILL MODAL */}
      {showAutoFillModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'12px',padding:'24px',maxWidth:'440px',width:'100%',border:'1px solid #262626'}}>
            <h2 style={{margin:'0 0 4px 0',fontSize:'20px',fontWeight:700,color:'#fff'}}>Auto-Fill Settings</h2>
            <p style={{margin:'0 0 20px 0',fontSize:'13px',color:'#999'}}>Customize how many of each type to add</p>
            {[['easyMeals','Quick and Easy Meals'],['communityMeals','Popular Community Meals'],['untriedRecipes','Recipes Not Yet Tried']].map(([key, label]) => (
              <div key={key} style={{marginBottom:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                  <label style={{fontWeight:600,color:'#fff',fontSize:'14px'}}>{label}</label>
                  <span style={{background:'#fff',color:'#000',padding:'2px 10px',borderRadius:'8px',fontWeight:700,fontSize:'14px'}}>{autoFillSettings[key]}</span>
                </div>
                <input type="range" min="0" max="7" value={autoFillSettings[key]} onChange={e => setAutoFillSettings(p => ({...p,[key]:parseInt(e.target.value)}))} style={{width:'100%'}} />
              </div>
            ))}
            <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
              <button onClick={() => setShowAutoFillModal(false)} style={{flex:1,padding:'11px',background:'#262626',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:600,color:'#fff'}}>Cancel</button>
              <button onClick={autoFillCalendar} style={{flex:1,padding:'11px',background:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:600,color:'#000'}}>Fill Calendar</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD RECIPE MODAL */}
      {showAddRecipeModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'12px',padding:'24px',maxWidth:'560px',width:'100%',maxHeight:'90vh',overflow:'auto',border:'1px solid #262626'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
              <h2 style={{margin:0,fontSize:'20px',fontWeight:700,color:'#fff'}}>Add New Recipe</h2>
              <button onClick={() => { setShowAddRecipeModal(false); setRecipeImagePreview(null); }} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#999" /></button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newRecipe = {
                id: Date.now(),
                name: fd.get('name'),
                prepTime: fd.get('prepTime') || '30 min',
                cookTime: parseInt(fd.get('cookTime')) || 30,
                servings: parseInt(fd.get('servings')) || 4,
                image: recipeImagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
                ingredients: fd.get('ingredients').split('\n').filter(i => i.trim()),
                instructions: fd.get('instructions').split('\n').filter(i => i.trim()),
                tags: [fd.get('mealType'), ...fd.get('tags').split(',').map(t => t.trim()).filter(t => t)],
                author: session.user.email.split('@')[0],
                timesMade: 0,
                isEasy: parseInt(fd.get('cookTime')) < 20
              };
              setUserRecipes(prev => [...prev, newRecipe]);
              await supabase.from('user_recipes').insert({user_id:session.user.id, recipe:newRecipe});
              setShowAddRecipeModal(false);
              setRecipeImagePreview(null);
              e.target.reset();
            }}>
              <div style={{marginBottom:'14px'}}>
                <label style={{display:'block',marginBottom:'5px',fontWeight:600,color:'#fff',fontSize:'13px'}}>Recipe Image</label>
                <div style={{border:'2px dashed #262626',borderRadius:'8px',padding:'16px',textAlign:'center',background:'#0a0a0a',position:'relative',overflow:'hidden',minHeight:'90px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {recipeImagePreview ? (
                    <div style={{position:'relative',width:'100%'}}>
                      <img src={recipeImagePreview} alt="Preview" style={{maxWidth:'100%',maxHeight:'140px',borderRadius:'6px',objectFit:'cover'}} />
                      <button type="button" onClick={() => setRecipeImagePreview(null)} style={{position:'absolute',top:'4px',right:'4px',background:'rgba(0,0,0,0.7)',border:'none',borderRadius:'50%',width:'26px',height:'26px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><X size={14} color="white" /></button>
                    </div>
                  ) : (
                    <>
                      <input type="file" accept="image/*" onChange={e => { const f=e.target.files[0]; if(f){const r=new FileReader();r.onloadend=()=>setRecipeImagePreview(r.result);r.readAsDataURL(f);} }} style={{position:'absolute',inset:0,opacity:0,cursor:'pointer'}} />
                      <div style={{color:'#666',fontSize:'13px'}}><div style={{fontSize:'26px',marginBottom:'4px'}}>📷</div><p style={{margin:0}}>Click to upload</p></div>
                    </>
                  )}
                </div>
              </div>
              <div style={{marginBottom:'12px'}}>
                <label style={{display:'block',marginBottom:'5px',fontWeight:600,color:'#fff',fontSize:'13px'}}>Recipe Name *</label>
                <input name="name" required placeholder="e.g. Spaghetti Carbonara" style={{width:'100%',padding:'9px 12px',border:'1px solid #262626',borderRadius:'6px',fontSize:'14px',background:'#0a0a0a',color:'#fff',boxSizing:'border-box'}} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px',marginBottom:'12px'}}>
                {[['prepTime','Prep Time','text','20 min'],['cookTime','Cook Time (min)','number','30'],['servings','Servings','number','4']].map(([name,label,type,ph]) => (
                  <div key={name}>
                    <label style={{display:'block',marginBottom:'4px',fontWeight:600,color:'#fff',fontSize:'12px'}}>{label}</label>
                    <input name={name} type={type} placeholder={ph} style={{width:'100%',padding:'9px 10px',border:'1px solid #262626',borderRadius:'6px',fontSize:'13px',background:'#0a0a0a',color:'#fff',boxSizing:'border-box'}} />
                  </div>
                ))}
              </div>
              <div style={{marginBottom:'12px'}}>
                <label style={{display:'block',marginBottom:'5px',fontWeight:600,color:'#fff',fontSize:'13px'}}>Meal Type *</label>
                <select name="mealType" required style={{width:'100%',padding:'9px 12px',border:'1px solid #262626',borderRadius:'6px',fontSize:'14px',background:'#0a0a0a',color:'#fff',cursor:'pointer'}}>
                  <option value="">Select...</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              {[['ingredients','Ingredients (one per line) *','1 cup quinoa\n2 cups water...'],['instructions','Instructions (one step per line) *','Rinse quinoa...\nBring to boil...']].map(([name,label,ph]) => (
                <div key={name} style={{marginBottom:'12px'}}>
                  <label style={{display:'block',marginBottom:'5px',fontWeight:600,color:'#fff',fontSize:'13px'}}>{label}</label>
                  <textarea name={name} required rows={4} placeholder={ph} style={{width:'100%',padding:'9px 12px',border:'1px solid #262626',borderRadius:'6px',fontSize:'13px',background:'#0a0a0a',color:'#fff',fontFamily:'system-ui',resize:'vertical',boxSizing:'border-box'}} />
                </div>
              ))}
              <div style={{marginBottom:'18px'}}>
                <label style={{display:'block',marginBottom:'5px',fontWeight:600,color:'#fff',fontSize:'13px'}}>Tags (comma separated)</label>
                <input name="tags" placeholder="Italian, Quick, Healthy" style={{width:'100%',padding:'9px 12px',border:'1px solid #262626',borderRadius:'6px',fontSize:'14px',background:'#0a0a0a',color:'#fff',boxSizing:'border-box'}} />
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button type="button" onClick={() => { setShowAddRecipeModal(false); setRecipeImagePreview(null); }} style={{flex:1,padding:'11px',background:'#262626',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:600,color:'#fff'}}>Cancel</button>
                <button type="submit" style={{flex:1,padding:'11px',background:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:600,color:'#000'}}>Add Recipe</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SAVE TO FOLDER MODAL */}
      {showSaveToFolderModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'16px',padding:'24px',maxWidth:'420px',width:'100%',border:'1px solid #262626'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
              <h2 style={{margin:0,fontSize:'20px',fontWeight:700,color:'#fff'}}>Save to Folder</h2>
              <button onClick={() => setShowSaveToFolderModal(null)} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#999" /></button>
            </div>
            <p style={{margin:'0 0 20px 0',fontSize:'13px',color:'#666'}}>"{showSaveToFolderModal.name}"</p>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',maxHeight:'340px',overflow:'auto'}}>
              {folders.map(folder => {
                const alreadyIn = folder.recipes.includes(showSaveToFolderModal.id);
                return (
                  <button key={folder.id} onClick={() => {
                    if (!alreadyIn) {
                      setFolders(prev => prev.map(f => f.id === folder.id ? {...f, recipes:[...f.recipes, showSaveToFolderModal.id]} : f));
                    }
                    setShowSaveToFolderModal(null);
                  }}
                    style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',background:alreadyIn?'#262626':'#141414',border:`1px solid ${alreadyIn?'#51cf66':'#2a2a2a'}`,borderRadius:'10px',cursor:alreadyIn?'default':'pointer',transition:'border-color 0.15s'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                      <span style={{fontSize:'22px'}}>{folder.emoji}</span>
                      <div style={{textAlign:'left'}}>
                        <p style={{margin:0,fontSize:'14px',fontWeight:600,color:'#fff'}}>{folder.name}</p>
                        <p style={{margin:0,fontSize:'11px',color:'#666'}}>{folder.recipes.length} recipes</p>
                      </div>
                    </div>
                    {alreadyIn
                      ? <span style={{fontSize:'12px',color:'#51cf66',fontWeight:600}}>✓ Saved</span>
                      : <span style={{fontSize:'18px',color:'#555'}}>+</span>
                    }
                  </button>
                );
              })}
              {/* Create new folder shortcut */}
              <button onClick={() => { setShowSaveToFolderModal(null); setShowFolderModal(true); }}
                style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',background:'#141414',border:'1px dashed #333',borderRadius:'10px',cursor:'pointer'}}>
                <span style={{fontSize:'22px'}}>➕</span>
                <p style={{margin:0,fontSize:'14px',fontWeight:600,color:'#666'}}>Create new folder</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE FOLDER MODAL */}
      {showFolderModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'16px',padding:'24px',maxWidth:'400px',width:'100%',border:'1px solid #262626'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{margin:0,fontSize:'20px',fontWeight:700,color:'#fff'}}>New Folder</h2>
              <button onClick={() => { setShowFolderModal(false); setNewFolderName(''); setNewFolderEmoji('📁'); }} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#999" /></button>
            </div>
            {/* Emoji picker */}
            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',marginBottom:'8px',fontWeight:600,color:'#fff',fontSize:'13px'}}>Choose an emoji</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {['🍽️','🥗','🍲','🥩','🐟','🥦','🧁','🍕','🌮','🥘','🍜','🥚','🥑','🍋','💪','⚡','🕯️','👶','🏠','📁'].map(e => (
                  <button key={e} onClick={() => setNewFolderEmoji(e)}
                    style={{width:'40px',height:'40px',background:newFolderEmoji===e?'#fff':'#262626',border:newFolderEmoji===e?'2px solid #fff':'2px solid #333',borderRadius:'8px',cursor:'pointer',fontSize:'20px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
            {/* Folder name */}
            <div style={{marginBottom:'24px'}}>
              <label style={{display:'block',marginBottom:'8px',fontWeight:600,color:'#fff',fontSize:'13px'}}>Folder name</label>
              <input
                type="text"
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                placeholder="e.g. Sunday Roasts"
                autoFocus
                style={{width:'100%',padding:'11px 14px',border:'1px solid #333',borderRadius:'8px',fontSize:'14px',background:'#0a0a0a',color:'#fff',outline:'none',boxSizing:'border-box'}}
              />
            </div>
            {/* Preview */}
            {newFolderName.trim() && (
              <div style={{background:'#262626',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{fontSize:'26px'}}>{newFolderEmoji}</span>
                <div>
                  <p style={{margin:0,fontSize:'15px',fontWeight:700,color:'#fff'}}>{newFolderName}</p>
                  <p style={{margin:0,fontSize:'11px',color:'#666'}}>0 recipes</p>
                </div>
              </div>
            )}
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={() => { setShowFolderModal(false); setNewFolderName(''); setNewFolderEmoji('📁'); }}
                style={{flex:1,padding:'11px',background:'#262626',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:600,color:'#fff'}}>Cancel</button>
              <button
                disabled={!newFolderName.trim()}
                onClick={() => {
                  if (!newFolderName.trim()) return;
                  const newFolder = { id: `f${Date.now()}`, name: newFolderName.trim(), emoji: newFolderEmoji, recipes: [] };
                  setFolders(prev => [...prev, newFolder]);
                  setShowFolderModal(false);
                  setNewFolderName('');
                  setNewFolderEmoji('📁');
                  setActiveFolder(newFolder.id);
                }}
                style={{flex:1,padding:'11px',background:newFolderName.trim()?'#fff':'#333',border:'none',borderRadius:'8px',cursor:newFolderName.trim()?'pointer':'not-allowed',fontWeight:600,color:newFolderName.trim()?'#000':'#666',transition:'all 0.15s'}}>
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECIPE DETAIL MODAL */}
      {selectedRecipe && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'12px',maxWidth:'720px',width:'100%',maxHeight:'90vh',overflow:'auto',border:'1px solid #262626'}}>
            <div style={{height:'240px',backgroundImage:`url(${selectedRecipe.image})`,backgroundSize:'cover',backgroundPosition:'center',position:'relative',borderRadius:'12px 12px 0 0'}}>
              <button onClick={() => setSelectedRecipe(null)} style={{position:'absolute',top:'12px',right:'12px',background:'rgba(0,0,0,0.7)',border:'none',borderRadius:'50%',width:'34px',height:'34px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><X size={18} color="white" /></button>
            </div>
            <div style={{padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <div>
                  <h2 style={{margin:'0 0 8px 0',fontSize:'26px',fontWeight:700,color:'#fff'}}>{selectedRecipe.name}</h2>
                  <RatingDisplay recipeId={selectedRecipe.id} />
                </div>
                <div style={{display:'flex',gap:'8px',marginLeft:'12px',flexShrink:0}}>
                  <button onClick={() => { setShowRatingModal(selectedRecipe); }} style={{padding:'8px 14px',background:userRatings[selectedRecipe.id]?'#1a1a1a':'#262626',border:'1px solid #333',borderRadius:'8px',fontWeight:600,fontSize:'13px',cursor:'pointer',color:userRatings[selectedRecipe.id]?'#fbbf24':'#999',whiteSpace:'nowrap'}}>
                    {userRatings[selectedRecipe.id] ? `★ ${userRatings[selectedRecipe.id].rating}` : '☆ Rate'}
                  </button>
                  <button onClick={() => { setShowSaveToFolderModal(selectedRecipe); setSelectedRecipe(null); }} style={{padding:'8px 14px',background:'#1a1a1a',border:'1px solid #333',borderRadius:'8px',fontWeight:600,fontSize:'13px',cursor:'pointer',color:'#fff',whiteSpace:'nowrap'}}>
                    🗂 Folder
                  </button>
                  <button onClick={() => { setShowAddToCalendar(selectedRecipe); setSelectedRecipe(null); }} style={{padding:'8px 14px',background:'#fff',border:'none',borderRadius:'8px',fontWeight:600,fontSize:'13px',cursor:'pointer',color:'#000',whiteSpace:'nowrap'}}>
                    + Calendar
                  </button>
                </div>
              </div>
              <div style={{display:'flex',gap:'18px',marginBottom:'20px',fontSize:'13px',color:'#999'}}>
                <span>⏱ {selectedRecipe.prepTime}</span>
                <span>🍽 {selectedRecipe.servings} servings</span>
                {selectedRecipe.timesMade !== undefined && <span>Made {selectedRecipe.timesMade}x</span>}
              </div>
              {selectedRecipe.ingredients && (<>
                <h3 style={{margin:'0 0 8px 0',fontSize:'15px',fontWeight:700,color:'#fff'}}>Ingredients</h3>
                <ul style={{marginBottom:'18px',paddingLeft:'18px'}}>
                  {selectedRecipe.ingredients.map((ing,i) => <li key={i} style={{marginBottom:'5px',color:'#999',lineHeight:1.5}}>{ing}</li>)}
                </ul>
              </>)}
              {selectedRecipe.instructions && (<>
                <h3 style={{margin:'0 0 8px 0',fontSize:'15px',fontWeight:700,color:'#fff'}}>Instructions</h3>
                {Array.isArray(selectedRecipe.instructions) ? (
                  <ol style={{paddingLeft:'18px'}}>
                    {selectedRecipe.instructions.map((step,i) => <li key={i} style={{marginBottom:'8px',color:'#999',lineHeight:1.6}}>{step}</li>)}
                  </ol>
                ) : <p style={{color:'#999'}}>{selectedRecipe.instructions}</p>}
              </>)}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MealPrepApp;
