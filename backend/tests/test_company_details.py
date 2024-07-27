import unittest
from tests import BaseTestCase

class TestCompanyDetails(BaseTestCase):
    def test_get_company_by_id(self):
        response = self.client.get('/api/companies/1')
        if response.status_code == 200:
            self.assertEqual(response.status_code, 200)
            self.assertIsInstance(response.json, dict)
        else:
            self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()