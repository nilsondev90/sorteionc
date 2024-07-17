import { Typography, Card, CardBody } from "@material-tailwind/react";

const SobreHome = () => {
    return (
        <div className="mt-5 pl-2 pr-2">
            <Card className="mt-6 rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <CardBody>
                    <Typography variant="h2" className="text-black">Atenção</Typography>
                    <Typography variant="paragraph">
                        Para visualizar a página do método clique em "MÉTODO VPF" <br />
                        Tudo será mudado tanto o Método quanto nesta página. Tudo está em desenvolvimento. <br />
                        Toda semana surgirá alguma modificação/melhoria.
                    </Typography>
                    <Typography variant="h5" className="pt-10">Finalidade desta página</Typography>
                    <Typography variant="paragraph">
                        Aqui será contido todos os conteúdos profissionais e orientações para os usuários ter um conhecimento melhor de forma geral.
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default SobreHome