using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using Wedding.Models;

namespace Wedding.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            IndexViewModel indexViewModel = GetMessages();

            return View(indexViewModel);
        }

        public ActionResult SaveMessage(string name, string message)
        {
            //Actually save the message.
            WriteMessageToFile(name, message);

            //Get a new partial
            string returnPartial = GeneratePartialView(ControllerContext, "_MessagePartial", ViewData, TempData, name, message);

            return Json(new { bSuccess = true, messagePartial = returnPartial });
        }

        public ActionResult SaveRSVP(string name, string email, string guestCount, string notes)
        {
            var fromAddress = new MailAddress("ian.p.weston@gmail.com", "Engagement Web Site *Do Not Reply*");
            //var toAddress = new MailAddress("caitlyn.b.munger@gmail.com", "Caitlyn");
            var toAddress = new MailAddress("ian.p.weston@gmail.com", "Caitlyn");
            string fromPassword = "Soultosqueeze";
            string subject = "Engagement RSVP **Do not reply**";
            string body = name + "/r/n" + email + "/r/n" + guestCount + "/r/n" + notes;

            try
            {
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
            }
            catch
            {
                return Json(new { bSuccess = false });
            }


            return Json(new { bSuccess = true });
        }

        public string GeneratePartialView(ControllerContext controller, string viewName, ViewDataDictionary viewData, TempDataDictionary tempData, string name, string message)
        {
            string View = string.Empty;

            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult result = ViewEngines.Engines.FindPartialView(controller, viewName);
                ViewContext context = new ViewContext(controller, result.View, viewData, tempData, sw);

                context.ViewBag.Name = name;
                context.ViewBag.Message = message;
                result.View.Render(context, sw);
                result.ViewEngine.ReleaseView(controller, result.View);

                View = sw.GetStringBuilder().ToString();
            }

            return View;
        }

        private void WriteMessageToFile(string name, string message)
        {
            string strFilePath = Server.MapPath("~/App_Data/Configuration.config");

            try
            {
                XDocument xDoc;
                using (StreamReader reader = new StreamReader(strFilePath))
                {
                    XmlReader xmlReader = XmlReader.Create(reader.BaseStream);
                    xDoc = XDocument.Load(xmlReader);

                    XElement Message = new XElement("Message");
                    Message.Add(new XElement("Name", name));
                    Message.Add(new XElement("Value", message));

                    xDoc.Elements().Elements("Messages").FirstOrDefault().Add(Message);

                }

                xDoc.Save(strFilePath);
            }
            catch (Exception ex)
            {

            }
        }

        private IndexViewModel GetMessages()
        {
            IndexViewModel indexViewModel = new IndexViewModel();

            string strFilePath = Server.MapPath("~/App_Data/Configuration.config");

            try
            {
                using (StreamReader reader = new StreamReader(strFilePath))
                {
                    XmlReader xmlReader = XmlReader.Create(reader.BaseStream);
                    XDocument xDoc = XDocument.Load(xmlReader);

                    var qryValue = from r in xDoc.Elements().Elements("Messages").Elements("Message")
                                   select r;

                    foreach(XElement element in qryValue)
                    {
                        string name = (from r in element.Elements("Name") select r).FirstOrDefault().Value.ToString();
                        string message = (from r in element.Elements("Value") select r).FirstOrDefault().Value.ToString();
                        
                        indexViewModel.Messages.Add(new MessageModel(){ Message = message, Name = name});
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return indexViewModel;
        }
    }
}