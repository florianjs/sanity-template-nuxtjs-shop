import { groq } from '@nuxtjs/sanity'

export default ({ app }, inject) => {
  const header = groq`{ "header": *[_id == "singleton-homepage"]{
    "fullWidth": fullwidth,
    "success": urlSuccess,
    "cancel": urlCancel,
    featuredbackground,
    mainImage,
    "colorlist": colorlist.value,
    body,
    desc,
    "items": header[]->{
      mainImage,
      title,
      "slug": slug.current,
    },
  }}`

  const featured = groq`{ "featured": *[_type == "item" && featured]{
    mainImage,
    title,
    slug,
  } 
}`

  const article = function (slug) {
    return groq`{ "item": *[_type == "item" && slug.current == "${slug}"]{
      mainImage,
      body,
      imagesGallery,
      title,
      prices
    } 
  }`
  }

  inject('api', { header, featured, article })
}
