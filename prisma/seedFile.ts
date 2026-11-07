import "dotenv/config"
import {PrismaClient} from '../src/generated/prisma/client.ts';

const prisma = new PrismaClient();

const userId = "1d8d112f-adb9-4e63-b75d-561e32c3fd51";

const movies =[
  {
    "title": "Inception",
    "overview": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "releaseYear": 2010,
    "genres": ["Sci-Fi", "Action", "Adventure"],
    "runTime": 148,
    "posterUrl": "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    "createdBy": userId
  },
  {
    "title": "The Dark Knight",
    "overview": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    "releaseYear": 2008,
    "genres": ["Action", "Crime", "Drama"],
    "runTime": 152,
    "posterUrl": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "createdBy": userId
  },
  {
    "title": "Interstellar",
    "overview": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    "releaseYear": 2014,
    "genres": ["Sci-Fi", "Drama", "Adventure"],
    "runTime": 169,
    "posterUrl": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "createdBy": userId
  },
  {
    "title": "The Matrix",
    "overview": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cybernetic intelligence.",
    "releaseYear": 1999,
    "genres": ["Action", "Sci-Fi"],
    "runTime": 136,
    "posterUrl": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "createdBy": userId
  },
  {
    "title": "Parasite",
    "overview": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "releaseYear": 2019,
    "genres": ["Comedy", "Thriller", "Drama"],
    "runTime": 132,
    "posterUrl": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "createdBy": userId
  },
  {
    "title": "Whiplash",
    "overview": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    "releaseYear": 2014,
    "genres": ["Drama", "Music"],
    "runTime": 106,
    "posterUrl": "https://image.tmdb.org/t/p/w500/7fn624j5JL3xTz2S23v7RBfEFHb.jpg",
    "createdBy": userId
  },
  {
    "title": "Gladiator",
    "overview": "A former Roman general sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    "releaseYear": 2000,
    "genres": ["Action", "Adventure", "Drama"],
    "runTime": 155,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    "createdBy": userId
  },
  {
    "title": "The Godfather",
    "overview": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    "releaseYear": 1972,
    "genres": ["Crime", "Drama"],
    "runTime": 175,
    "posterUrl": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "createdBy": userId
  },
  {
    "title": "Fight Club",
    "overview": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    "releaseYear": 1999,
    "genres": ["Drama"],
    "runTime": 139,
    "posterUrl": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "createdBy": userId
  },
  {
    "title": "Spirited Away",
    "overview": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    "releaseYear": 2001,
    "genres": ["Animation", "Family", "Fantasy"],
    "runTime": 125,
    "posterUrl": "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    "createdBy": userId
  }
]



const main = async()=>{
    for(const movie of movies){
        await prisma.movie.create({
            data:movie
        })
    }
}

main().catch((err)=>{
    console.log(err);
    process.exit(1)
    
}).finally(
   async()=>{
    await prisma.$disconnect();
   }

)