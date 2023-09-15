// Importaciones
import { Link } from "react-router-dom";
// Componente
const FooterLink = ({phrase, linkPhrase, url, classPhrase}) => {
    return (
        <p>
            {phrase}
            <Link to={url} className={classPhrase}>
                {linkPhrase}
            </Link>
        </p>
    )
}

// Exportamos el componente
export default FooterLink