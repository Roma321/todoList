import { LILAC_COLOR } from "../../constants"
import { RadialGradientCircle } from "./RadialGradientCircle"

export const Circles = () => {
    return <>
        <RadialGradientCircle
            color={'#e1dca2'}
            radius={250}
            top={120}
            right={0} />
        <RadialGradientCircle
            color={'#bff7ff'}
            radius={200}
            top={450}
            left={0} />
        <RadialGradientCircle
            color={LILAC_COLOR}
            radius={250}
            top={150}
            left={150} />
    </>
}