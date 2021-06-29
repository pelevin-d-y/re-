import React from 'react'
import Layout from 'src/layouts/Layout'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchPeople = () =>
  axios.get('https://swapi.dev/api/people/').then((res) => res.data)

const fetchPlanet = () =>
  axios.get('https://swapi.dev/api/planets/').then((res) => res.data)

const SignUp: React.FC = () => {
  const { data, isLoading } = useQuery('people', fetchPeople)
  const { data: dataPlanets } = useQuery('planets', fetchPlanet)

  if (isLoading) {
    return <span>Loading...</span>
  }
  return (
    <Layout>
      {data?.results.map((item: { name: string }) => (
        <div key={item.name}>{item.name}</div>
      ))}
      {dataPlanets?.results.map((item: { name: string }) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </Layout>
  )
}
export default SignUp
