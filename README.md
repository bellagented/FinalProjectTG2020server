#COINOP BACKEND


Progetto finale per il Codemaster Bootcamp di [Talent Garden](https://https://talentgarden.org/) di:
- [Daniele Bellagente](https://github.com/bellagented)
- [Matteo Spanu](https://github.com/Matteo-Spanu)
- [Dario Bellusci](https://github.com/dariobellusci)

Social network per videogiocatori per condividere post, recensioni, giochi preferiti e appuntamenti per multiplayer.\
Necessità di essere affiancato al [frontend](https://github.com/bellagented/FinalProjectTG2020).


## File necessari

il progetto necessità:\
 di un account [Cloudinary](https://cloudinary.com/) e di inserire nel file .env:

`CLOUDINARY_NAME= *your cloudinary name*`

 di un account [AirTable](https://cloudinary.com/) e di inserire nel file .env:

`AIRTABLE_API_KEY=*your key*`\
`AIRTABLE_BASE_ID=*your id*`

Airtable dovrà avere le seguenti tabelle:

### RecTable

| User | Game | Review | Comments |
| ----------- | ----------- |----------- |----------- |

