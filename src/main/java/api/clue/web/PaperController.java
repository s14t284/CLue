package api.clue.web;

import api.clue.domain.Paper;
import api.clue.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PaperController {

    @Autowired
    private PaperService paperService;

    @RequestMapping(value="/papers/{id}", method=RequestMethod.GET)
    public Paper paperById(@PathVariable("id") int id){
        Paper paper = paperService.findById(id);
        return paper;
    }

    @RequestMapping(value="/papers", method=RequestMethod.GET)
    public List<Paper> findPapers(@RequestParam(name = "task", required = false) String task,
                                  @RequestParam(name = "title", required = false) String title,
                                  @RequestParam(name = "introduction", required = false) String introduction,
                                  @RequestParam(name = "lang", required = false) String lang,
                                  @RequestParam(name = "conference", required = false) String conference
                                  ) {
        List<Paper> papers = paperService.findPapers(task, title, introduction,
                                                     lang, conference);
        return papers;
    }

    @RequestMapping(value="papers", method=RequestMethod.POST)
    public void addPaper (
            @RequestParam(value = "year", required = false) int year,
            @RequestParam(value = "label", required = false) String label,
            @RequestParam(value = "title") String title,
            @RequestParam(value = "url") String url,
            @RequestParam(value = "introduction", required = false) String introduction,
            @RequestParam(value = "conference", required = false) String conference
    ) {
        paperService.addPaper(year, label, title, url, introduction, conference);
    }

    @RequestMapping(value="/papers/{id}", method=RequestMethod.PATCH)
    public void updatePaper(
            @PathVariable("id") int id,
            @RequestParam(value = "year", required = false) int year,
            @RequestParam(value = "label", required = false) String label,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "url", required = false) String url,
            @RequestParam(value = "introduction", required = false) String introduction,
            @RequestParam(value = "conference", required = false) String conference
    ) {
        paperService.updatePaper(id, year, label, title, url, introduction, conference);
    }


    @RequestMapping(value="papers/{id}", method=RequestMethod.DELETE)
    public void deletePaper(@PathVariable("id") int id) {
        paperService.deletePaper(id);
    }
}
