import { Chapter } from './types';

export const STORY_DATA: Chapter[] = [
  {
    id: 1,
    title: "Badai Besar",
    prophetName: "Nabi Nuh AS",
    introText: "Kamu terlempar ke masa lalu. Langit gelap, angin menderu. Di hadapanmu, seorang lelaki tua yang tabah sedang diejek oleh kaumnya saat membuat kapal di atas bukit.",
    worldDesc: "Gurun tandus yang mulai diselimuti awan hitam pekat. Rumah-rumah batu sederhana. Orang-orang berpakaian kasar menertawakan pembuatan kapal.",
    startingSceneId: 'nuh_1',
    hikmah: "Kesabaran bukan berarti diam, tetapi tetap taat meski seluruh dunia menentang.",
    scenes: {
      'nuh_1': {
        id: 'nuh_1',
        text: "Seorang pemuda melemparkan batu ke arah Nabi Nuh AS sambil tertawa. Nabi Nuh hanya diam dan terus memaku papan kayu. Apa yang kamu lakukan?",
        bgDesc: "Construction of a massive wooden ark in a desert landscape under ominous clouds",
        imagePlaceholder: "boat",
        choices: [
          {
            text: "Menghardik pemuda itu dengan marah",
            effect: { iman: 0, akhlak: -1, keberanian: 2 },
            feedback: "Kamu berteriak marah. Pemuda itu lari, tapi Nabi Nuh mengingatkanmu untuk bersabar.",
            nextSceneId: 'nuh_2'
          },
          {
            text: "Berdiri di depan Nabi Nuh untuk melindunginya",
            effect: { iman: 1, akhlak: 1, keberanian: 2 },
            feedback: "Kamu menjadi tameng. Batu mengenai bahumu. Nabi Nuh tersenyum berterima kasih.",
            nextSceneId: 'nuh_2'
          },
          {
            text: "Ikut membantu mengangkat kayu",
            effect: { iman: 1, akhlak: 2, keberanian: 1 },
            feedback: "Kamu mengabaikan ejekan dan fokus bekerja. Ketenanganmu membuat para pengejek bosan.",
            nextSceneId: 'nuh_2'
          }
        ]
      },
      'nuh_2': {
        id: 'nuh_2',
        text: "Hujan mulai turun deras. Air memancar dari tanah. Kaum yang tadi mengejek kini panik berlarian. Nabi Nuh memanggil umatnya naik ke kapal. Seorang anak (Kan'an) menolak naik.",
        bgDesc: "Heavy rain, flooding rising, panic in the village, the ark door open",
        imagePlaceholder: "storm",
        choices: [
          {
            text: "Berteriak memaksanya naik",
            effect: { iman: 1, akhlak: 0, keberanian: 1 },
            feedback: "Dia tetap menolak dan lari ke gunung. Hidayah adalah milik Allah.",
            nextSceneId: 'NEXT_CHAPTER'
          },
          {
            text: "Mendoakan keselamatan kaum beriman",
            effect: { iman: 2, akhlak: 1, keberanian: 0 },
            feedback: "Kamu masuk ke kapal dengan hati sedih namun tawakkal. Pintu kapal tertutup.",
            nextSceneId: 'NEXT_CHAPTER'
          }
        ]
      }
    }
  },
  {
    id: 2,
    title: "Api yang Dingin",
    prophetName: "Nabi Ibrahim AS",
    introText: "Kamu berada di Babilonia. Patung-patung berhala besar menghiasi setiap sudut kota. Raja Namrud yang sombong mengaku sebagai Tuhan.",
    worldDesc: "Kota megah dengan ziggurat tinggi, patung emas, cuaca panas terik.",
    startingSceneId: 'ibr_1',
    hikmah: "Api dunia tak akan mampu membakar iman yang tertanam kuat di dada.",
    scenes: {
      'ibr_1': {
        id: 'ibr_1',
        text: "Malam hari di kuil penyembahan. Nabi Ibrahim AS memegang kapak, berniat menghancurkan berhala untuk menyadarkan kaumnya. Beliau melihatmu.",
        bgDesc: "Night time inside a temple filled with stone idols",
        imagePlaceholder: "statue",
        choices: [
          {
            text: "Ragu dan takut ketahuan penjaga",
            effect: { iman: -1, akhlak: 0, keberanian: -1 },
            feedback: "Nabi Ibrahim menatapmu tajam, 'Takutlah hanya pada Allah'. Kamu pun bangkit.",
            nextSceneId: 'ibr_2'
          },
          {
            text: "Menjaga pintu agar Nabi aman beraksi",
            effect: { iman: 1, akhlak: 1, keberanian: 2 },
            feedback: "Kamu berjaga dengan waspada. Terdengar suara berhala hancur satu per satu.",
            nextSceneId: 'ibr_2'
          }
        ]
      },
      'ibr_2': {
        id: 'ibr_2',
        text: "Raja Namrud murka! Api unggun raksasa disiapkan untuk membakar Nabi Ibrahim. Rakyat bersorak melihat hukuman itu. Panasnya terasa sampai ke kulitmu.",
        bgDesc: "A massive bonfire roaring in a public square, a crowd gathering",
        imagePlaceholder: "fire",
        choices: [
          {
            text: "Pejamkan mata dan berdoa",
            effect: { iman: 3, akhlak: 1, keberanian: 1 },
            feedback: "Kamu mendengar suara gemuruh, lalu hening. Api itu menjadi dingin dan menyelamatkan.",
            nextSceneId: 'NEXT_CHAPTER'
          },
          {
            text: "Berteriak 'Allah Maha Besar!'",
            effect: { iman: 2, akhlak: 0, keberanian: 3 },
            feedback: "Suaramu menggema. Beberapa orang tertegun. Api menjilat langit, tapi Nabi Ibrahim duduk tenang di dalamnya.",
            nextSceneId: 'NEXT_CHAPTER'
          }
        ]
      }
    }
  },
  {
    id: 3,
    title: "Membelah Lautan",
    prophetName: "Nabi Musa AS",
    introText: "Debu padang pasir beterbangan. Kamu berlari bersama ribuan Bani Israil. Di belakang, derap kuda pasukan Fir'aun semakin dekat.",
    worldDesc: "Padang pasir Mesir, piramida di kejauhan, laut merah membentang di depan.",
    startingSceneId: 'mus_1',
    hikmah: "Saat logika manusia buntu, pertolongan Allah datang bagi mereka yang yakin.",
    scenes: {
      'mus_1': {
        id: 'mus_1',
        text: "Kalian terpojok di tepi Laut Merah. Orang-orang mulai putus asa dan menyalahkan Nabi Musa. 'Kita akan mati di sini!' teriak mereka.",
        bgDesc: "Crowd of people at the edge of the sea, looking fearful",
        imagePlaceholder: "sea",
        choices: [
          {
            text: "Menenangkan orang di sekitarmu",
            effect: { iman: 1, akhlak: 2, keberanian: 1 },
            feedback: "Kamu berkata, 'Bersabarlah, Allah bersama kita'. Kekacauan sedikit mereda.",
            nextSceneId: 'mus_2'
          },
          {
            text: "Siap siaga dengan senjata kayu",
            effect: { iman: 1, akhlak: 0, keberanian: 2 },
            feedback: "Kamu berdiri di barisan belakang, siap menghadang pasukan Fir'aun sebisamu.",
            nextSceneId: 'mus_2'
          }
        ]
      },
      'mus_2': {
        id: 'mus_2',
        text: "Nabi Musa memukul tongkatnya. LAUT TERBELAH! Dinding air menjulang tinggi. Lantai laut kering. Pasukan Fir'aun semakin dekat.",
        bgDesc: "The sea parted forming two walls of water, dry path in between",
        imagePlaceholder: "wave",
        choices: [
          {
            text: "Membantu lansia menyeberang",
            effect: { iman: 1, akhlak: 3, keberanian: 1 },
            feedback: "Kamu memapah seorang kakek. Kalian berjalan di antara dinding air yang menakjubkan.",
            nextSceneId: 'NEXT_CHAPTER'
          },
          {
            text: "Berlari secepat mungkin menyelamatkan diri",
            effect: { iman: 0, akhlak: -1, keberanian: 0 },
            feedback: "Kamu selamat, tapi merasa malu melihat orang lain saling membantu.",
            nextSceneId: 'NEXT_CHAPTER'
          }
        ]
      }
    }
  },
  {
    id: 4,
    title: "Kasih Sayang Al-Masih",
    prophetName: "Nabi Isa AS",
    introText: "Kamu berada di perkampungan yang kumuh. Banyak orang sakit dikucilkan. Nabi Isa AS berjalan dengan tenang, wajahnya memancarkan cahaya kasih sayang.",
    worldDesc: "Perkampungan batu kapur, pohon zaitun, suasana sore yang hangat.",
    startingSceneId: 'isa_1',
    hikmah: "Kekerasan hati hanya bisa dilunakkan dengan ketulusan dan kasih sayang.",
    scenes: {
      'isa_1': {
        id: 'isa_1',
        text: "Seorang penderita kusta mendekat meminta tolong. Orang banyak melemparinya batu karena jijik. Nabi Isa hendak menyentuhnya.",
        bgDesc: "A leper reaching out, crowd throwing stones, Jesus stepping forward",
        imagePlaceholder: "hands",
        choices: [
          {
            text: "Menghalangi lemparan batu",
            effect: { iman: 1, akhlak: 2, keberanian: 2 },
            feedback: "Kamu terkena lemparan, tapi si penderita kusta aman. Nabi Isa menyembuhkannya dengan izin Allah.",
            nextSceneId: 'isa_2'
          },
          {
            text: "Memberi minum si sakit",
            effect: { iman: 1, akhlak: 3, keberanian: 1 },
            feedback: "Kamu memberikan air dengan lembut. Akhlakmu membuat orang-orang malu melempar batu.",
            nextSceneId: 'isa_2'
          }
        ]
      },
      'isa_2': {
        id: 'isa_2',
        text: "Para pemuka agama yang dengki merencanakan penangkapan Nabi Isa. Mereka menyebar fitnah bahwa Nabi Isa adalah penyihir.",
        bgDesc: "Angry religious leaders whispering in shadows",
        imagePlaceholder: "scroll",
        choices: [
          {
            text: "Membantah fitnah mereka di pasar",
            effect: { iman: 1, akhlak: 0, keberanian: 3 },
            feedback: "Kamu berdebat dengan mereka. Meski mereka marah, beberapa orang mulai sadar akan kebenaran.",
            nextSceneId: 'NEXT_CHAPTER'
          },
          {
            text: "Menyampaikan pesan damai Nabi Isa",
            effect: { iman: 2, akhlak: 2, keberanian: 1 },
            feedback: "Kamu menyebarkan ajaran kasih sayang. Allah menyelamatkan Nabi Isa dari makar mereka.",
            nextSceneId: 'NEXT_CHAPTER'
          }
        ]
      }
    }
  },
  {
    id: 5,
    title: "Cahaya Rahmat",
    prophetName: "Nabi Muhammad SAW",
    introText: "Makkah yang panas. Tekanan kaum Quraisy semakin berat. Nabi Muhammad SAW dan para sahabat diboikot, kelaparan, dan diancam.",
    worldDesc: "Kota Makkah kuno, Ka'bah dikelilingi berhala, lorong-lorong sempit berdebu.",
    startingSceneId: 'muh_1',
    hikmah: "Kemenangan sejati adalah memaafkan saat mampu membalas.",
    scenes: {
      'muh_1': {
        id: 'muh_1',
        text: "Kamu melihat Nabi Muhammad SAW sedang sujud, lalu seorang kafir Quraisy hendak menaruh kotoran unta di punggung beliau.",
        bgDesc: "Prophet prostrating near Kaaba, enemy approaching with filth",
        imagePlaceholder: "desert",
        choices: [
          {
            text: "Mendorong orang kafir itu menjauh",
            effect: { iman: 1, akhlak: 0, keberanian: 3 },
            feedback: "Kamu mendorongnya hingga jatuh. Ia marah besar, tapi Nabi terlindungi.",
            nextSceneId: 'muh_2'
          },
          {
            text: "Membersihkan punggung Nabi dengan lembut",
            effect: { iman: 2, akhlak: 3, keberanian: 1 },
            feedback: "Setelah Nabi selesai shalat, kamu membersihkan kotoran itu. Nabi tersenyum padamu.",
            nextSceneId: 'muh_2'
          }
        ]
      },
      'muh_2': {
        id: 'muh_2',
        text: "Saat Hijrah, Nabi dan Abu Bakar bersembunyi di Gua Tsur. Pasukan pengejar sudah berada tepat di mulut gua. Ketegangan memuncak.",
        bgDesc: "Dark cave entrance, spider web covering it, sunlight outside",
        imagePlaceholder: "cave",
        choices: [
          {
            text: "Panik dan bersiap bertarung",
            effect: { iman: 0, akhlak: 0, keberanian: 1 },
            feedback: "Abu Bakar menenangkanmu. 'Jangan sedih, Allah bersama kita'. Kamu merasa malu.",
            nextSceneId: 'NEXT_CHAPTER'
          },
          {
            text: "Yakin sepenuhnya pada perlindungan Allah",
            effect: { iman: 3, akhlak: 1, keberanian: 2 },
            feedback: "Hatimu tenang. Merpati bertelur dan laba-laba membuat sarang. Musuh pergi karena mengira gua kosong.",
            nextSceneId: 'NEXT_CHAPTER'
          }
        ]
      }
    }
  }
];