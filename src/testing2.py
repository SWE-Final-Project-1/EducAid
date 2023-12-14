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

    def test_login(self):
        self.driver.get("http://localhost:3000/login")
        print("Current URL:", self.driver.current_url)
        #time.sleep(5)

        

        # Navigate to the login page
        try:
            login_button = self.wait_for_element(By.XPATH, "//button[text()='Log In']")
            print("Login button found")
            login_button.click()
            print("Clicked on login button")
        except Exception as e:
            print(f"Error: {e}")

        
        
        


        # Fill in the login form
        email_input = self.wait_for_element(By.ID, "email")
        password_input = self.wait_for_element(By.ID, "password")
        login_button = self.wait_for_element(By.XPATH, "//button[contains(text(), 'Log In')]", visibility=True)


        # Input values using JavaScript to bypass potential issues
        email_input.send_keys("testname@gmail.com")
        password_input.send_keys("123456")

        # Submit the login form
        login_button.click()

        # Check if login was successful (you may need to adjust this)
        success_message = self.wait_for_element(By.XPATH, "//p[contains(text(), 'Login successful')]", visibility=True)
        self.assertTrue(success_message.is_displayed(), "Login was not successful.")
        
        # Wait for 5 seconds before closing the browser
        time.sleep(5)
        # Close the browser window
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()

    
