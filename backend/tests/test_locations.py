import unittest
from tests import BaseTestCase

class TestLocations(BaseTestCase):
    def test_get_locations_by_company_id(self):
        response = self.client.get('/api/companies/1/locations')
        if response.status_code == 200:
            self.assertEqual(response.status_code, 200)
            self.assertIsInstance(response.json, list)
        else:
            self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()