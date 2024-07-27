import unittest
from tests import BaseTestCase

class TestCompanies(BaseTestCase):
    def test_get_all_companies(self):
        response = self.client.get('/api/companies')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

if __name__ == '__main__':
    unittest.main()