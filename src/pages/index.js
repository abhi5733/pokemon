import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import PokemonList from '../../components/PokemonList';
import { Box, Button, Grid, HStack } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ pokemons }) {
  const[pages,Setpages] = useState(1)
  console.log(pokemons)


  const handleChange=(e)=>{
Setpages(e)

  }

  return (
    <>
      <Box>
        <Box width="80%" margin="auto" bgColor="gray.100" >
          <PokemonList page={pages} pokemons={pokemons} />
        </Box>
    <Box mt="20px" textAlign="center" >  <Button onClick={()=>handleChange(1)} >1</Button>
          <Button  onClick={()=>handleChange(2)}>2</Button>
          <Button onClick={()=>handleChange(3)}>3</Button>
          </Box> 
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokemon2.vercel.app/',
    cache: new InMemoryCache(),
  });

  const promises = [];

  // Fetch data for the first three pages
  for (var i = 1; i <= 1; i++) {
    promises.push(
      client.query({
        query: gql`
        query pokemons($first: Int!) {
          pokemons(first: $first) {
              id
              number
              name
              weight {
                minimum
                maximum
              }
              height {
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
        variables: { first: 60 },
      })
    );
  }

  const results = await Promise.all(promises);

  const pokemons = results.flatMap(result => result.data.pokemons);

  return {
    props: {
      pokemons,
    },
  };
}