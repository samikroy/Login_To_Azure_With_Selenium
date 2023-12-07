using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System.IO;
using System.Threading;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main()
        {
            ChromeOptions chromeOptions = new ChromeOptions();
            chromeOptions.AddExtensions(System.Configuration.ConfigurationManager.AppSettings["extensionpath"]);
            IWebDriver driver = new ChromeDriver(System.Configuration.ConfigurationManager.AppSettings["chromedriverpath"], chromeOptions);
            driver.Navigate().GoToUrl("https://portal.azure.com/");
            driver.FindElement(By.Id("i0116")).Clear();
            driver.FindElement(By.Id("i0116")).SendKeys(System.Configuration.ConfigurationManager.AppSettings["username"]);
            driver.FindElement(By.Id("i0116")).SendKeys(Keys.Enter);
            driver.FindElement(By.Id("i0118")).Clear();
            driver.FindElement(By.Id("i0118")).SendKeys(System.Configuration.ConfigurationManager.AppSettings["pwd"]);
            Thread.Sleep(500);
            driver.FindElement(By.Id("i0118")).SendKeys(Keys.Enter);
            driver.FindElement(By.Id("idSIButton9")).Click();
        }
    }
}

