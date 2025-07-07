import ratelimit  from "../config/upstash.js"

const rateLimit = async (req, res, next) => {

    try {
        const {success} =await ratelimit.limit("my-limit-key")

        if (!success){
            return resizeBy.status(429).json({
                message:" too many request, please try again later"
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error)
        next(error);
    }
}
export default rateLimit