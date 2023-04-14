import {useRouter} from "next/router"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useEffect, useState } from "react";
import { Box, Image ,Text , Flex, Button } from "@chakra-ui/react";







const page = () => {
  const [pokemons, setPokemons] = useState([]);
    const router = useRouter()
  const page = router.query.page
const[height,Setheight] = useState("")
const[data,Setdata] = useState([])
const[weight,Setweight] = useState("")
const[weak,Setweak] = useState([])
const[ resistant,Setresistant] = useState([])
const[evol,Setevol] = useState([])
const[state,Setstate] = useState(false)
   console.log(pokemons)

 
  useEffect(() => {
    const client = new ApolloClient({
      uri: 'https://graphql-pokemon2.vercel.app/',
      cache: new InMemoryCache()
    });

    client.query({
      query: gql`
      query pokemon($id: String){
        pokemon(id: $id){
          id
          number
          name
          weight{
            minimum
            maximum
          }
          height{
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
      }
      `, 
      variables: { id: page}
    }).then(data => {  Setresistant(data.data.pokemon.resistant)  ; Setdata(data.data.pokemon.types);Setweak(data.data.pokemon.weaknesses)  ; Setheight(data.data.pokemon.height.minimum) ; Setweight(data.data.pokemon.weight.minimum);setPokemons(data.data.pokemon)})
      .catch(error => console.error(error));
  }, []);


  const handleClick=()=>{
  
    const client = new ApolloClient({
      uri: 'https://graphql-pokemon2.vercel.app/',
      cache: new InMemoryCache()
    });

    client.query({
      query: gql`
      query pokemon($id: String, $name: String){
        pokemon(id: $id, name: $name){
          id
          name
          evolutions{
            id
            number
            name
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            evolutions{
              id
              number
              name
              classification
              types
              resistant
              weaknesses
              fleeRate
              maxCP
              maxHP
              image
            }
            maxHP
            image
          }
        }
      }
 
    `, 
      variables: { id: page  }
    }).then(data => {  Setstate(true); console.log(data);Setevol(data.data.pokemon.evolutions)})
      .catch(error => console.error(error));


  }
  


  // let pok = pokemons.types
  // console.log(pok.length)
    return (
      <Box  >
     {pokemons && <Box width="80%"  bgColor="gray.100"  margin="50px auto"  > 
         <Text textAlign="center" fontSize="30" fontWeight="bold" >{pokemons.name}</Text>
         
         <Flex mt="20"> 
       <Box  height="400px" fontWeight="bold" > 
            <Image height="100%" padding="10px" src={pokemons.image} alt={pokemons.name} /> </Box>
            <Box width="50%" padding="10" fontSize="20px" lineHeight="10" fontWeight="bold" bgColor="skyblue" > 
            <Text  mt="10px">classification : <span style={{color:"red"}} > {pokemons.classification}  </span> </Text>
            <Text mt="10px">Height :<span style={{color:"red"}} >  {height} </span></Text>
            <Text mt="10px">Weight : <span style={{color:"red"}} >  {weight} </span></Text>
           
            <Text  fontWeight="bold" >Types : <span style={{color:"red"}} >  {data.join(",")} </span></Text>
            <Text   > Weakness : <span style={{color:"red"}} > {weak.join(",")} </span></Text>
            <Text   > resistant : <span style={{color:"red"}} >  {resistant.join(",")} </span>  </Text>
           <Button bgColor="red" color="white" onClick={handleClick} >click</Button>

           
          </Box>
          </Flex>
          </Box> 
    }
     {state && <Box position="absolute" width="700px" left="50%" zIndex="100" bgColor="white" padding="10px" transform="translate(-50%)" top="20%" boxShadow="xl" >
     <Text width="100%" textAlign="end" onClick={()=>Setstate(false)} >X</Text>
<Flex  > 

   {evol.map((el)=>{
   return <Box>
  
    <Image height="100%" src={el.image} />
    </Box>
   })}

</Flex>
    </Box> }
          </Box> 
   
  )
}


export default page
