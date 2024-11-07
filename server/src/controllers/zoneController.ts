import zoneService from '~/services/zoneService'
import { Request, Response } from 'express'

const zoneController = {
  getZones: async (req: Request, res: Response) => {
    try {
      const zones = await zoneService.getZones()
      res.status(200).json({ status: 'success', data: zones })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  selectZones: async (req: Request, res: Response) => {
    try {
      const { latitude, longitude, radius } = req.body
      const selectedZone = await zoneService.selectZones(latitude, longitude, radius)
      res.status(200).json({ status: 'success', data: selectedZone })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  deleteZones: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await zoneService.deleteZone(id)
      res.status(200).json({ status: 'success', message: 'Zone deleted successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default zoneController
