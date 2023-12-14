import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class WebAppTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000")

    def tearDown(self):
        self.driver.quit()

    def wait_for_element(self, by, value, timeout=10, visibility=False):
        if visibility:
            return WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located((by, value))
            )
        else:
            return WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, value))
            )

    def test_register(self):
        # Registration
        # Navigate to the registration page
        register_button = self.wait_for_element(By.XPATH, "//button[contains(text(), 'Register Here')]")
        register_button.click()

        # Fill in the registration form
        name_input = self.wait_for_element(By.ID, "name")
        email_input = self.wait_for_element(By.ID, "email")
        password_input = self.wait_for_element(By.ID, "password")
        phone_input = self.wait_for_element(By.ID, "phoneNumber")
        school_input = self.wait_for_element(By.ID, "schoolName")
        address_input = self.wait_for_element(By.ID, "address")
        register_button = self.wait_for_element(By.XPATH, "//button[text()='Register']")

        name_input.send_keys("Musah Amidu")  
        email_input.send_keys("testname@gmail.com")
        password_input.send_keys("123456")
        phone_input.send_keys("0123456789")
        school_input.send_keys("Test High School")
        address_input.send_keys("123 Testing St")
        
        
        
        # name_input.send_keys("1234")  
        # email_input.send_keys("testname")
        # password_input.send_keys("12")
        # phone_input.send_keys("phoneNumber")
        # school_input.send_keys("Test High School")
        # address_input.send_keys("123 Testing St")
        
        

        # Submit the registration form
        register_button.click()

        
        try:
            success_message = self.wait_for_element(By.XPATH, "//div[contains(text(), 'Registration successful')]", visibility=True, timeout=20)
            print("Success message found")
            self.assertTrue(success_message.is_displayed(), "Registration was not successful.")
        except Exception as e:
            print(f"Error finding success message: {e}")
    
            # Print the page source for debugging
            print(self.driver.page_source)
        
if __name__ == "__main__":
    unittest.main()
