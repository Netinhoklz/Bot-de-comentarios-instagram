const Instagram = require("instagram-web-api")

module.exports = class GeneratePostFactory {

  async execute(client) {
    try {

    const posts = await client.getPhotosByHashtag({
      hashtag: 'ceara',
      first: 1
    })
    
    const mediaId = await posts.hashtag.edge_hashtag_to_media.edges[0].node.id
    console.log(`https://www.instagram.com/p/${posts.hashtag.edge_hashtag_to_media.edges[0].node.shortcode}`)
    return { mediaId };
  } catch(err) {
    console.log('Problema ao pegar o post pela hashtag')
  }

  }
}