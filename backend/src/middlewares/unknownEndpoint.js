export const unknownEndpoint = (req, res, nex) => {
    return res.status(404).json({ message: 'Unknown Endpoint.' })
}