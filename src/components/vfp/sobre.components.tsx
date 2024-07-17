import { Typography, Card, CardBody } from "@material-tailwind/react";

const Sobre = () => {
    return (
        <div className="mt-5 pl-2 pr-2">
            <Card className="mt-6 rounded-xl border border-white bg-black/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <CardBody>
                    <Typography variant="h2" className="text-blue-500">Método VFP</Typography>
                    <Typography variant="paragraph">
                        Liberte sua vida com o
                        Método VFP.
                    </Typography>
                    <Typography variant="h3">Quem somos? Já pararam para pensar nisso?</Typography>
                    <Typography variant="paragraph">
                        Quem somos ou estamos está relacionado às nossas experiências desde a vida intrauterina até o momento atual. Todos passamos por experiências positivas (funcionais) e negativas (disfuncionais). As interpretações dessas experiências modulam nossa forma de pensar, sentir e agir no mundo (modelo cognitivo-comportamental).

                        Muitas vezes somos invadidos por certos padrões de pensamentos. Esses pensamentos são denominados pensamentos automáticos. Ou seja, não controlamos sua entrada e somos invadidos por eles. Em grande maioria, esses pensamentos são disfuncionais, irracionais e nos trazem consequências que são mal adaptativas na infância, na adolescência e na vida adulta.

                        Sendo assim, muitas vezes tendemos a agir no “piloto automático”. E isso acaba por criar padrões rígidos na forma de pensar, sentir e agir relacionados a crenças centrais de desamor, desamparo, desvalor, fracasso, incapacidade, entre outras.
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default Sobre