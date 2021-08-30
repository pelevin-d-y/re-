/* eslint-disable no-console */
import React from 'react'
import Button from 'src/components/shared-ui/Button'
import Layout from 'src/layouts/Layout'
import { css } from 'astroturf'
import {
  getRecommendations,
  postRecommendations,
  getContact,
  getMetrics,
  getAuth,
  getContactsMutable,
  getContactsSearch,
  getMessagesRead,
  getPlaylists,
} from 'src/api'

const Requests: React.FC = () => {
  const recommendationsRequest = () => {
    getRecommendations().then((res) =>
      console.log('Get recommendations response -->', res)
    )
  }

  const recommendationsRequestPost = () => {
    postRecommendations().then((res) =>
      console.log('Get recommendations response -->', res)
    )
  }

  const contactRequest = () => {
    getContact().then((res) => console.log('Get contact response -->', res))
  }

  const metricsRequest = () => {
    getMetrics().then((res) => console.log('Get metrics response -->', res))
  }

  const authRequest = () => {
    getAuth().then((res) => console.log('Get auth response -->', res))
  }

  const contactsMutableRequest = () => {
    getContactsMutable('00000000-0000-0000-0000-000000000000').then((res) =>
      console.log('Get contacts mutable response -->', res)
    )
  }

  const contactsSearchRequest = () => {
    getContactsSearch('matt@work.example.com', 'Matthew').then((res) =>
      console.log('Get contacts mutable response -->', res)
    )
  }

  const playlistsRequest = () => {
    getPlaylists().then((res) => console.log('Get playlist response -->', res))
  }

  const messagesReadRequest = () => {
    getMessagesRead('20rdy2g0n3k312gbzni5g5rt7:cf8bv53sf7jkl29ddrt7296vk').then(
      (res) => console.log('Get message read response -->', res)
    )
  }

  return (
    <Layout>
      <ul className={s.list}>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={recommendationsRequest}>
              Get recommendations request
            </Button>
          </div>
          <div className={s.right}>GET: /dash/recommendations?number=2</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={recommendationsRequestPost}>
              Post recommendations request
            </Button>
          </div>
          <div className={s.right}>Post: /dash/recommendations</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={contactRequest}>
              Get contact request
            </Button>
          </div>
          <div className={s.right}>GET: /client/contact</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={metricsRequest}>
              Get metrics request
            </Button>
          </div>
          <div className={s.right}>GET: /dash/metrics</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={authRequest}>
              Get auth
            </Button>
          </div>
          <div className={s.right}>GET: /client/authorization</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={contactsMutableRequest}>
              Get contacts mutable
            </Button>
          </div>
          <div className={s.right}>GET: /contacts/mutable</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={contactsSearchRequest}>
              Get contacts search request
            </Button>
          </div>
          <div className={s.right}>
            GET: /contacts/search. Query: email=matt@work.example.com ;
            name=Matthew
          </div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={messagesReadRequest}>
              Get messages read request
            </Button>
          </div>
          <div className={s.right}>
            GET: /messages/read. Query:
            id=20rdy2g0n3k312gbzni5g5rt7:cf8bv53sf7jkl29ddrt7296vk
          </div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <Button variant="contained" handler={playlistsRequest}>
              Get playlists
            </Button>
          </div>
          <div className={s.right}>GET: /playlists</div>
        </li>
        <li className={s.item}>
          <div className={s.left}>
            <img
              src="https://api.nylas.com/contacts/dlcr4ee37iy3w97tf5j801i8f/picture"
              alt="nylas img"
            />
          </div>
        </li>
      </ul>
    </Layout>
  )
}

const s = css`
  .list {
    padding: 20px;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;

    border-bottom: 1px solid black;

    &:last-child {
      border-bottom: none;
    }
  }

  .left {
    width: 300px;
  }
`

export default Requests
