import { Box, Grid, Image ,Text} from "@chakra-ui/react";
import Link from "next/link";
function PokemonList({ pokemons , page }) {
  if(page==2){
    pokemons = pokemons.slice(20,40)
  }  if(page==1){
    pokemons = pokemons.slice(0,20)
  }  if(page==3){
    pokemons = pokemons.slice(40,60)
  } 
  return (
    <Grid gridTemplateColumns="repeat(4,1fr)"  gap="20px" > 
        {pokemons.map(pokemon => (
      <Link href={`/blog/${pokemon.id}`} >      <Box padding="10px" boxShadow="xl" key={pokemon.id}>
           <Box  height="200px"> 
            <Image height="100%"  src={pokemon.image} alt={pokemon.name} /> </Box>
            <Text mt="10px">#{pokemon.number}</Text>
            <Text fontSize="20px" fontWeight="bold" >{pokemon.name}</Text>
         <Text>{pokemon.types.join(',')}</Text>
           
          
          </Box> </Link> 
        ))}
    </Grid>
    );
  }
  export default PokemonList