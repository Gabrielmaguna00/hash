//El encriptado se encuentra limitado por la tabla ascii, se pueden usar valores a partir del 48 o sea no se pueden usar:(espacio)!"#$%&'()*+,-./
//sum debe ser igual o menor a 20
//salt debe ser menor al largon del string ya que en caso contrario no tiene uso.
//la encriptacion se basa en ir generando un caracter cada un numero salt de caracteres, el caracter agregado se forma mediante la posicion donde se encuentra (i) menos el numero ingresado en salt (5 por defecto)
const encrypted = (text, salt = 5, num = 5) => {
  //En text se debe colocar string SIN ESPACIOS (orientado a ID o contraseñas sin espacio), salt indica la cantidad de caracteres que deben pasar para agregar un caracter generado por la letra salt posiciones atras y se le suma num al charcode. Num es el numero el cual se le suma a todas las letras en su charcode
  let hash = ""; //en esta variable guardo el string encriptado
  let cont = salt; //controla el avance de salt caracteres
  for (let i = 0; i < text.length; i++) {
    let char;
    i - cont === 0 //evaluo si ya pasaron salt caracteres
      ? ((char = //en caso de true compruebo si al sumaerle num a al caracter pasado a charcode no supera el valor de 126
          num + text.charCodeAt(i - salt) > 126
            ? num + text.charCodeAt(i - salt) - 94 //Caso TRUE: si supera 126 le resto 94 para partir de la "base"(48) y sumarle desde ahi el num
            : num + text.charCodeAt(i - salt)), //Caso FALSE: le sumo al charcode num
        (cont += salt), //al cont le sumo salt para una vez pasados los salt caracteres, generar otro caracter
        (hash += String.fromCharCode(char))) //Vuelvo el charcode a string
      : null; //si no pasaron salt caracteres, continuo
    char =
      text.charCodeAt(i) + num > 126 //realizo la misma evaluacion que en la linea 12
        ? num + text.charCodeAt(i) - 94
        : num + text.charCodeAt(i);
    hash += String.fromCharCode(char);
  }
  console.log(hash); //miro la encriptacion por consola
  return hash;
};

const decrypt = (code, salt = 5, num = 5) => {
    //para desencriptar se debe colocar el mismo numero de salt y num. Se debe ingresar el codigo encriptado que se vio por consola
    let text = ""; //en esta variable guardo el string desencriptado
    let cont = salt;
    for (let i = 0; i < code.length; i++) {
        let char;
        i - cont === 0 //evaluo si pasaron salt caracteres
        ? (cont += salt + 1) //caso TRUE actualizo mi cont sumandole salt y 1 para lograr que registre el pase de salt caracteres. Sin el +1 registro el pase de salt-1 caracteres
        : ((char = //caso FALSE compruebo si el string en la posicion i pasado a charcode es menor a 48
        code.charCodeAt(i) < 48
        ? code.charCodeAt(i) + 94 - num //caso TRUE: sumo 94 para contrarrestar los 94 que se resto en la encriptacion y resto num (la operacion contraria en la encriptacion)
        : code.charCodeAt(i) - num), //caso FALSE: solo resto num (la operacion contraria en la encriptacion)
        (text += String.fromCharCode(char))); //guardo caracter por caracter
    }
    console.log(text); //miro el texto original por consola
    return text;
};

encrypted("StringPrueba", 5, 5);//encriptacion

decrypt("XywnsXlUwzjlgf", 5, 5);//desencriptacion
